﻿///<amd-module name="world/VertexBufferObject"/>
import Kernel = require("./Kernel");

class VertexBufferObject{
	buffer: WebGLBuffer;

	constructor(public target: number){
		//target: ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER
		this.buffer = Kernel.gl.createBuffer();
	}

	bind(){
		Kernel.gl.bindBuffer(this.target, this.buffer);
	}

	unbind(){
		Kernel.gl.bindBuffer(this.target, null);
	}

	bufferData(data: number[], usage: number, hasBinded: boolean = false){
		if(!hasBinded){
			this.bind();
		}

		var gl = Kernel.gl;

		if(this.target === gl.ARRAY_BUFFER){
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), usage);
		}else if(this.target === gl.ELEMENT_ARRAY_BUFFER){
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), usage);
		}
	}

	destroy(){
		if(this.buffer){
			Kernel.gl.deleteBuffer(this.buffer);
		}
		this.buffer = null;
	}
}

export = VertexBufferObject;