const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk'); // You may need to install this: npm install chalk

// Configuration
const srcDirectory = path.join(__dirname, '../src');
const publicDirectory = path.join(__dirname, '../public');
const pagesDirectory = path.join(srcDirectory, 'pages');
const componentsDirectory = path.join(srcDirectory, 'components');

// Check if chalk is installed
try {
  require.resolve('chalk');
} catch (error) {
  console.log('Installing chalk for colored output...');
  execSync('npm install chalk --save-dev');
  console.log('Chalk installed successfully.');
}

// Helper function to read file content
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return '';
  }
};

// Helper function to get all files with specific extensions
const getFiles = (dir, extensions) => {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // Recursively search directories
      results = results.concat(getFiles(filePath, extensions));
    } else {
      // Check if file has one of the specified extensions
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results;
};

// SEO Audit Functions
const auditFunctions = {
  // Check if pages have SEO component
  checkSEOComponent: () => {
    console.log(chalk.blue('\n📋 Checking for SEO component in pages...'));
    
    const pageFiles = getFiles(pagesDirectory, ['.jsx', '.js']);
    let issues = 0;
    
    pageFiles.forEach(file => {
      const content = readFile(file);
      const fileName = path.basename(file);
      
      if (!content.includes('import SEO from') || !content.includes('<SEO')) {
        console.log(chalk.red(`❌ ${fileName} is missing SEO component`));
        issues++;
      } else {
        console.log(chalk.green(`✅ ${fileName} has SEO component`));
      }
    });
    
    return issues;
  },
  
  // Check for missing alt text in images
  checkImageAltText: () => {
    console.log(chalk.blue('\n📋 Checking for image alt text...'));
    
    const jsxFiles = getFiles(srcDirectory, ['.jsx', '.js']);
    let issues = 0;
    
    jsxFiles.forEach(file => {
      const content = readFile(file);
      const fileName = path.basename(file);
      
      // Check for img tags without alt attribute or with empty alt
      const imgTagsWithoutAlt = (content.match(/<img(?![^>]*alt=(['"])(?:(?!\1).)*\1)[^>]*>/g) || []);
      const imgTagsWithEmptyAlt = (content.match(/<img[^>]*alt=(['"])(?:(?!\1).)*\1[^>]*>/g) || [])
        .filter(tag => tag.match(/alt=(['"])\1/) || tag.match(/alt=(['"])\s*\1/));
      
      if (imgTagsWithoutAlt.length > 0 || imgTagsWithEmptyAlt.length > 0) {
        console.log(chalk.red(`❌ ${fileName} has ${imgTagsWithoutAlt.length + imgTagsWithEmptyAlt.length} images without proper alt text`));
        issues += imgTagsWithoutAlt.length + imgTagsWithEmptyAlt.length;
      }
      
      // Check for Image components without alt prop or with empty alt
      const imageComponentsWithoutAlt = (content.match(/<Image(?![^>]*alt=(['"])(?:(?!\1).)*\1)[^>]*>/g) || []);
      const imageComponentsWithEmptyAlt = (content.match(/<Image[^>]*alt=(['"])(?:(?!\1).)*\1[^>]*>/g) || [])
        .filter(tag => tag.match(/alt=(['"])\1/) || tag.match(/alt=(['"])\s*\1/));
      
      if (imageComponentsWithoutAlt.length > 0 || imageComponentsWithEmptyAlt.length > 0) {
        console.log(chalk.red(`❌ ${fileName} has ${imageComponentsWithoutAlt.length + imageComponentsWithEmptyAlt.length} Image components without proper alt text`));
        issues += imageComponentsWithoutAlt.length + imageComponentsWithEmptyAlt.length;
      }
    });
    
    return issues;
  },
  
  // Check for meta description length
  checkMetaDescriptionLength: () => {
    console.log(chalk.blue('\n📋 Checking meta description length...'));
    
    const pageFiles = getFiles(pagesDirectory, ['.jsx', '.js']);
    let issues = 0;
    
    pageFiles.forEach(file => {
      const content = readFile(file);
      const fileName = path.basename(file);
      
      // Extract description from SEO component
      const descriptionMatch = content.match(/description=["']([^"']+)["']/);
      
      if (descriptionMatch) {
        const description = descriptionMatch[1];
        
        if (description.length < 50) {
          console.log(chalk.yellow(`⚠️ ${fileName} has a short meta description (${description.length} chars). Aim for 50-160 characters.`));
          issues++;
        } else if (description.length > 160) {
          console.log(chalk.yellow(`⚠️ ${fileName} has a long meta description (${description.length} chars). Aim for 50-160 characters.`));
          issues++;
        } else {
          console.log(chalk.green(`✅ ${fileName} has a good meta description length (${description.length} chars)`));
        }
      } else {
        console.log(chalk.red(`❌ ${fileName} is missing a meta description`));
        issues++;
      }
    });
    
    return issues;
  },
  
  // Check for heading structure
  checkHeadingStructure: () => {
    console.log(chalk.blue('\n📋 Checking heading structure...'));
    
    const pageFiles = getFiles(pagesDirectory, ['.jsx', '.js']);
    let issues = 0;
    
    pageFiles.forEach(file => {
      const content = readFile(file);
      const fileName = path.basename(file);
      
      // Check if there's an h1 tag
      const h1Tags = (content.match(/<h1[^>]*>/g) || []).length;
      
      if (h1Tags === 0) {
        console.log(chalk.red(`❌ ${fileName} is missing an H1 heading`));
        issues++;
      } else if (h1Tags > 1) {
        console.log(chalk.yellow(`⚠️ ${fileName} has multiple H1 headings (${h1Tags}). Consider using only one.`));
        issues++;
      } else {
        console.log(chalk.green(`✅ ${fileName} has a proper H1 heading`));
      }
      
      // Check for heading order (e.g., h3 without h2)
      const h2Tags = (content.match(/<h2[^>]*>/g) || []).length;
      const h3Tags = (content.match(/<h3[^>]*>/g) || []).length;
      
      if (h3Tags > 0 && h2Tags === 0) {
        console.log(chalk.yellow(`⚠️ ${fileName} has H3 tags without H2 tags. Consider proper heading hierarchy.`));
        issues++;
      }
    });
    
    return issues;
  },
  
  // Check for required SEO files
  checkRequiredFiles: () => {
    console.log(chalk.blue('\n📋 Checking for required SEO files...'));
    
    const requiredFiles = [
      { path: path.join(publicDirectory, 'robots.txt'), name: 'robots.txt' },
      { path: path.join(publicDirectory, 'sitemap.xml'), name: 'sitemap.xml' },
      { path: path.join(componentsDirectory, 'SEO.jsx'), name: 'SEO component' }
    ];
    
    let issues = 0;
    
    requiredFiles.forEach(file => {
      if (fs.existsSync(file.path)) {
        console.log(chalk.green(`✅ ${file.name} exists`));
      } else {
        console.log(chalk.red(`❌ ${file.name} is missing`));
        issues++;
      }
    });
    
    return issues;
  }
};

// Run all audit functions
const runAudit = () => {
  console.log(chalk.bold.blue('🔍 Starting SEO Audit...\n'));
  
  let totalIssues = 0;
  
  // Run each audit function
  Object.values(auditFunctions).forEach(auditFn => {
    totalIssues += auditFn();
  });
  
  // Summary
  console.log(chalk.bold.blue('\n📊 SEO Audit Summary'));
  
  if (totalIssues === 0) {
    console.log(chalk.bold.green('✅ No SEO issues found! Great job!'));
  } else {
    console.log(chalk.bold.yellow(`⚠️ Found ${totalIssues} SEO issues to address.`));
  }
  
  console.log(chalk.bold.blue('\n📚 SEO Recommendations:'));
  console.log('1. Ensure all pages have proper meta titles and descriptions');
  console.log('2. Add alt text to all images for better accessibility and SEO');
  console.log('3. Maintain proper heading structure (one H1, followed by H2, H3, etc.)');
  console.log('4. Regularly update your sitemap.xml');
  console.log('5. Check page load speed using Google PageSpeed Insights');
  console.log('6. Set up Google Search Console and Analytics for monitoring');
  
  return totalIssues;
};

// Execute the audit
runAudit();
