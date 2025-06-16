const carImages = import.meta.glob('../assets/*.{jpg,jpeg,png,svg}', {
  eager: true,
  import: 'default',
});

const imageMap = {};

for (const path in carImages) {
  const key = path
    .split('/')
    .pop()
    .replace(/\.[^/.]+$/, ''); 
  imageMap[key] = carImages[path];
}

export default imageMap;