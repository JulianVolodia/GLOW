/*
* Shader Compiled Data
* @author: Mikael Emtinger, gomo.se
*/

GLOW.CompiledData = (function() {
    
    "use strict"; "use restrict";
    
    // private data, functions and initializations here

    // constructor
    
    function compiledData( program, uniforms, attributes, interleavedAttributes, elements, extras ) {
	    this.program = program;
	    this.uniforms = uniforms !== undefined ? uniforms : {};
	    this.attributes = attributes !== undefined ? attributes : {};
	    this.interleavedAttributes = interleavedAttributes !== undefined ? interleavedAttributes : {};
	    this.elements = elements;
	    
	    extras = extras !== undefined ? extras : {};
	    this.preDrawCallback = extras.preDrawCallback;
	    this.postDrawCallback = extras.postDrawCallback;
	    this.blend = extras.blend;
	    this.stencil = extras.stencil;
    }


    compiledData.prototype.clone = function( except ) {
    	var clone = new GLOW.CompiledData();
    	except = except !== undefined ? except : {};

    	var u;
    	for( u in this.uniforms ) {
    		if( except[ u ] ) {
    			clone.uniforms[ u ] = new GLOW.Uniform( this.uniforms[ u ], except[ u ] );
    		} else {
    			clone.uniforms[ u ] = this.uniforms[ u ];
    		}
    	}

    	var a;
    	for( a in this.attributes ) {
    		if( except[ a ] ) {
    		    if( !this.attributes[ a ].interleaved ) {
        			clone.attributes[ a ] = new GLOW.Attribute( this.attributes[ a ], except[ a ] );
    		    } else {
    		        console.error( "GLOW.Compiler.clone: Cannot use except parameter on interleaved attribute. Please make sure it's not interleaved by using the interleave property." );
    		    }
    		} else {
    			clone.attributes[ a ] = this.attributes[ a ];
    		}
    	}

    	if( except.elements ) {
    		clone.elements = new GLOW.Elements( except.elements );
    	} else {
    		clone.elements = this.elements;
    	}

        if( except.program ) {
        	clone.program = except.program;
        } else {
        	clone.program = this.program;
        }
        
        if( except.blend ) {
            clone.blend = except.blend;
        } else {
            clone.blend = this.blend;
        }
        
        if( except.stencil ) {
            clone.stencil = except.stencil;
        } else {
            clone.stencil = this.stencil;
        }
        
        if( except.preDrawCallback ) {
            clone.preDrawCallback = except.preDrawCallback;
        } else {
            clone.preDrawCallback = this.preDrawCallback;
        }
        
        if( except.postDrawCallback ) {
            clone.postDrawCallback = except.postDrawCallback;
        } else {
            clone.postDrawCallback = this.postDrawCallback;
        }

    	return clone;
    };
    
    return compiledData;
})();

