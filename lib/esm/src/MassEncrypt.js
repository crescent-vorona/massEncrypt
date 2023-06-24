
const MOD = (n,m) => ((n % m) + m) % m;

export class MassEncrypt{
	
	static encrypt(str, key, chunkSize=255){
		let chunks = [];
		let currChunk = [];

		for(let i=0;i<str.length;i++){
			let j = (i % key.length);

			let char = str.charAt(i);
			let keyChar = key.charAt(j);

			let charCode = char.charCodeAt(0);
			let keyCode = keyChar.charCodeAt(0);

			let newCharCode = MOD((charCode + keyCode), 16777215);

			let newChar = String.fromCharCode(newCharCode);

			currChunk.push(newChar);

			if(currChunk.length >= chunkSize){
				chunks.push(currChunk);
				currChunk = [];
			}
		}
		chunks.push(currChunk);

		let newStr = '';
		for(let chunk of chunks){
			let str = chunk.join('');
			newStr += `${str}`;
			if(chunks.at(-1) !== chunk){
				newStr += `\t\n`;
			}
		}

		return newStr;
	}
	static decrypt(str, key){
		let lines = str.split(`\t\n`);

		let newStr = '';
		let j = 0;

		for(let line of lines){
			let chunk = line.split('');

			for(let i=0;i<chunk.length;i++){
				let char = chunk[i];
				let keyChar = key.charAt(j);
				
				let charCode = char.charCodeAt(0);
				let keyCode = keyChar.charCodeAt(0);

				let oldCharCode = MOD((charCode - keyCode), 16777215);
				
				let oldChar = String.fromCharCode(oldCharCode);
				
				newStr += oldChar;

				j = (++j % key.length);
			}
		}

		return newStr;
	}

}

// (()=>{
// 	let json = {milk: 'egg',egg:true};
// 	// let msg = 'The quick brown fox jumped over the lazy dog';
// 	let msg = JSON.stringify(json);
// 	let key = 'egThe quick brown fox jumped over the lazy dogg';

// 	let newMsg = MassEncrypt.encrypt(msg, key,16);
// 	let oldMsg = MassEncrypt.decrypt(newMsg, key);

// 	console.log(`msg: ${msg}`);
// 	console.log(`key: ${key}`);
// 	console.log(`newMsg: ${newMsg}`);
// 	console.log(`oldMsg: ${oldMsg}`);

// })();