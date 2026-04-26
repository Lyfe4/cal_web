const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const imagesDirectory = path.join(__dirname, '../src/images');
const optimizedDirectory = path.join(__dirname, '../src/images/optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDirectory)) {
  fs.mkdirSync(optimizedDirectory, { recursive: true });
  console.log(`Created directory: ${optimizedDirectory}`);
}

// Check if imagemin is installed
const checkDependencies = () => {
  try {
    // Check if required packages are installed
    console.log('Checking dependencies...');
    
    // This will throw an error if the package is not installed
    require.resolve('imagemin');
    require.resolve('imagemin-mozjpeg');
    require.resolve('imagemin-pngquant');
    require.resolve('imagemin-webp');
    
    console.log('All dependencies are installed.');
    return true;
  } catch (error) {
    console.error('Missing dependencies. Please install the required packages:');
    console.error('npm install -g imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp');
    return false;
  }
};

// Optimize images
const optimizeImages = () => {
  if (!checkDependencies()) {
    return;
  }

  // Get all image files
  const imageFiles = fs.readdirSync(imagesDirectory)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });

  if (imageFiles.length === 0) {
    console.log('No image files found to optimize.');
    return;
  }

  console.log(`Found ${imageFiles.length} image files to optimize.`);

  // Process each image
  imageFiles.forEach(file => {
    const inputPath = path.join(imagesDirectory, file);
    const outputPath = path.join(optimizedDirectory, file);
    const ext = path.extname(file).toLowerCase();
    
    try {
      // Skip if the file is already in the optimized directory
      if (inputPath.includes('optimized')) {
        return;
      }
      
      // Optimize based on file type
      if (['.jpg', '.jpeg'].includes(ext)) {
        execSync(`imagemin ${inputPath} --plugin=mozjpeg --out-dir=${optimizedDirectory}`);
        console.log(`Optimized JPEG: ${file}`);
      } else if (ext === '.png') {
        execSync(`imagemin ${inputPath} --plugin=pngquant --out-dir=${optimizedDirectory}`);
        console.log(`Optimized PNG: ${file}`);
      } else if (ext === '.gif') {
        execSync(`imagemin ${inputPath} --out-dir=${optimizedDirectory}`);
        console.log(`Optimized GIF: ${file}`);
      }
      
      // Also create WebP version for modern browsers
      const webpOutputPath = path.join(optimizedDirectory, `${path.basename(file, ext)}.webp`);
      execSync(`imagemin ${inputPath} --plugin=webp --out-dir=${optimizedDirectory}`);
      console.log(`Created WebP version: ${path.basename(webpOutputPath)}`);
      
    } catch (error) {
      console.error(`Error optimizing ${file}:`, error.message);
    }
  });

  console.log('Image optimization complete!');
  console.log(`Optimized images saved to: ${optimizedDirectory}`);
  console.log('To use optimized images, update your imports to use the optimized versions.');
};

// Execute
optimizeImages();
