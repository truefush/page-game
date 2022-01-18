let initCanvas = () =>{
    let tx = document.getElementById('canvas').getContext('2d');
    let backgroundImage = new Image();
    //nave
    let naveImage = new Image();
    //enemies
    let enemiespic1 =new Image();
    let enemiespic2 =new Image();

    backgroundImage.src = 'img/background-pic.jpg';
    naveImage.src = 'img/spaceship-pic.png';
    enemiespic1.src = 'img/enemigo1.png';
    enemiespic2.src = 'img/enemigo2.png';

    let cW = tx.canvas.width;
    let cH = tx.canvas.height;

    let enemyTemplate = function(options){
        return{
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h:options.h || '',
            image: options.image || enemiespic1
        }
    }

    let enemies = [
        new enemyTemplate({id:'enemy3', x:350, y:50, w:80, h:30})
    ];

    let renderEnemies = function(enemyList){

        for(let i=0; i < enemyList.length; i++){
            let enemy = enemyList[i];
            tx.drawImage(enemy.image, enemy.x, enemy.y += .5, enemy.w, enemy.h);
        }
    }

    function Launcher(){
        this.y = 500,
        this.x = cW*.5 -25,
        this.w = 100,
        this.h = 100.
        this.direction,
        this.bg = 'white',
        this.misiles = [];

        this.render = function(){
            if(this.direccion === 'left'){
                this.x -= 5;
            }
            else if(this.direccion === 'right'){
                this.x += 5;
            }
            else if(this.direccion === 'down'){
                this.y += 5;
            }
            else if(this.direccion === 'up'){
                this.y -= 5;
            }
            tx.fillStyle = this.bg;
            tx.drawImage(backgroundImage, 10,10);
            tx.drawImage(naveImage, this.x, this.y, 100, 90);

            for(let i=0;i<this.misiles.length;i++){
                let m = this.misiles[i];
                tx.fillRect(m.x, m.y -= 5, m.w, m.h);

                if(m.y <= 0){
                    this.misiles.splice(i, 1);
                }
            }
        }
    }

    let launcher = new Launcher();
    function animate(){
        tx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    let animateInterval = setInterval(animate, 6);

    let left = document.getElementById('left');
    let fire = document.getElementById('fire');
    let right = document.getElementById('right');
    //--------------------------------------------------------------
    //left
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 37){
            launcher.direccion = 'left';
            if(launcher.x < cW*.2 -130){
                launcher.x +=0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 37){
            launcher.x += 0;
            launcher.direccion = '';
        }
    });
    //key gamer
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 65){
            launcher.direccion = 'left';
            if(launcher.x < cW*.2 -130){
                launcher.x +=0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 65){
            launcher.x += 0;
            launcher.direccion = '';
        }
    });
//-------------------------------------------------------------
    //right
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 39){
            launcher.direccion = 'right';
            if(launcher.x > cW - 110){
                launcher.x -= 0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 39){
            launcher.x -= 0;
            launcher.direccion = '';
        }
    });
    //key gamer
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 68){
            launcher.direccion = 'right';
            if(launcher.x > cW -110){
                launcher.x -= 0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 68){
            launcher.x -= 0;
            launcher.direccion = '';
        }
    });
//----------------------------------------------------------------
    //up
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 38){
            launcher.direccion = 'up';
            if(launcher.y < cH*.2 - 80){
                launcher.y += 0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 38){
            launcher.y -= 0;
            launcher.direccion = '';
        }
    });
    //key gamer
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 87){
            launcher.direccion = 'up';
            if(launcher.y < cH*.2 - 80){
                launcher.y += 0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 87){
            launcher.y -= 0;
            launcher.direccion = '';
        }
    });
//--------------------------------------------------------------
    //down
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 40){
            launcher.direccion = 'down';
            if(launcher.y > cH - 110){
                launcher.y -= 0;
                launcher.direccion = '';
            }
        }
    });
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 40){
            launcher.y += 0;
            launcher.direccion = '';
        }
    });
    
        //key gamer
        document.addEventListener('keydown', function(e){
            if(e.keyCode === 83){
                launcher.direccion = 'down';
                if(launcher.y > cH - 110){
                    launcher.y -= 0;
                    launcher.direccion = '';
                }
            }
        });
        document.addEventListener('keyup', function(e){
            if(e.keyCode === 83){
                launcher.y += 0;
                launcher.direccion = '';
            }
        });

//--------------------------------------------------------------------
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 80){
            location.reload();
        }
    });

    //lft
    left.addEventListener('mousedown',(e)=>{
        launcher.direccion = 'left';
    });
    left.addEventListener('mouseup',(e)=>{
        launcher.direccion = '';
    });
    
    //right
    right.addEventListener('mousedown',(e)=>{
        launcher.direccion = 'right';
    });
    right.addEventListener('mouseup',(e)=>{
        launcher.direccion = '';
    });

    document.addEventListener('keydown',(e)=>{
        if(e.keyCode === 32){
            launcher.misiles.push({
                x: launcher.x + launcher.w * .5,
                y: launcher.y,
                w: 3,
                h: 10
            });
        }
    });
}
window.addEventListener('load',(e)=>{
    initCanvas();
});
