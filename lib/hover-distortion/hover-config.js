const portfolioItems = document.querySelectorAll('.portfolio__item');

portfolioItems.forEach((item) => {
    const itemImages = item.querySelectorAll('img');

    new hoverEffect({
        parent: item,
        intensity: 0.3,
        image1: itemImages[0].src,
        image2: itemImages[1].src,
        displacementImage: 'img/portfolio/distortion.jpg'
    });
});