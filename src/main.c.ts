/// <reference path="../node_modules/@types/node/index.d.ts" />

interface rgba {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface definitions {
	r: number;
	g: number;
	b: number;
	id: number;
}

class Main {
	private Jimp = require("jimp");
	private fs = require("fs");
	private mapArr: number[] = [];
	private definitions: definitions[] = null;

	public init(): void {
		if(!process.argv[2]){
			console.log('specify path to img file');
			return;
		}
		else if(!process.argv[3]){
			console.log('specify path to definitions file');
			return;
		}
		else if(!process.argv[4]){
			console.log('specify path and name for output file');
			return;
		}
		this.fs.readFile(process.argv[3], (err, data) => {
			if (err) throw err;
			this.definitions = JSON.parse(data);
			this.readImg();
		});

	}

	public readImg(): void {
		this.Jimp.read(process.argv[2],(err, image) => {
			if(!image){
				console.log('wrong img path');
				return;
			}
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
		let mapSerial: string = null;
		for(let pixel of arr){
			if(pixel.a === 255){
				for(let definition of this.definitions){
					if(pixel.r === definition.r && pixel.g === definition.g && pixel.b === definition.b){
						this.mapArr.push(definition.id);
						break;
					}
				}
			}
			else this.mapArr.push(0);
		}
		mapSerial = JSON.stringify(this.mapArr);
		//write json
		this.writeToFile(mapSerial);
		//write bin
		let buffer = Buffer.alloc(this.mapArr.length);
		for(let i:number = 0; i < this.mapArr.length; i++)
		{
			buffer.writeUInt8(this.mapArr[i],i);
		}
		this.writeToFile(buffer,'binary');

	}

	public writeToFile(data: any, type?: string): void {
		this.fs.writeFile(process.argv[4] + ( type === 'binary'?'.bin':''), data, type?type:'utf8', (err) => {
		    if(err) {
		        return console.log(err);
		    }
		});
	}
}

let main: Main = new Main();
main.init();