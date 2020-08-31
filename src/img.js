import logo from './1.png';

export const createImgByJS = () => {
    const newImage = new Image();
    newImage.src = logo;
    document.body.appendChild(newImage);
}