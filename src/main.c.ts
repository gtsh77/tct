/// <reference path="../node_modules/@types/node/index.d.ts" />

interface rgba {
	r: number;
	b: number;
	g: number;
	a: number;
}

class Main {
	private Jimp = require("jimp");
	private mapArr: number[] = [];

	public init(): void {
		if(!process.argv[2]){
			console.log('specify path to img file');
			return;
		}
		this.Jimp.read(process.argv[2],(err, image) => {
		   	let width: number = image.bitmap.width;
		   	let height: number = image.bitmap.height;
		   	let arr: rgba[] = [];
		   	
		   	for(let i: number = 0; i < height; i++){
		   		for(let j: number = 0; j < width; j++){
		   			arr.push(this.Jimp.intToRGBA(image.getPixelColor(j,i)));
		   		}
		   	}
		   	this.buildMap(arr);
		});
	}

	public buildMap(arr: rgba[]): void {
		for(let pixel of arr){
			if(pixel.a !== 0){
				if(pixel.r === 255 && pixel.g === 255 && pixel.b === 255) this.mapArr.push(1);
				else if(pixel.r === 0 && pixel.g === 0 && pixel.b === 0) this.mapArr.push(2);
			}
			else this.mapArr.push(0);
		}
		console.log(JSON.stringify(this.mapArr))
	}
}

let main: Main = new Main();
main.init();