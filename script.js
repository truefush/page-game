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
        new enemyTemplate({id:'enemy1', x:100, y:-20, w:50, h:30}),
        new enemyTemplate({id:'enemy2', x:225, y:-20, w:50, h:30}),
        new enemyTemplate({id:'enemy3', x:350, y:-20, w:80, h:30}),
        new enemyTemplate({id:'enemy4', x:100, y:-70, w:80, h:30}),
        new enemyTemplate({id:'enemy5', x:225, y:-70, w:50, h:30}),
        new enemyTemplate({id:'enemy6', x:350, y:-70, w:50, h:30}),
        new enemyTemplate({id:'enemy7', x:475, y:-70, w:50, h:30}),
        new enemyTemplate({id:'enemy8', x:600, y:-70, w:80, h:30}),
        new enemyTemplate({id:'enemy9', x:475, y:-20, w:50, h:30}),
        new enemyTemplate({id:'enemy10', x:600, y:-20, w:50, h:30}),
        // second group of enemys
        new enemyTemplate({id:'enemy11', x:100, y:-220, w:50, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy12', x:225, y:-220, w:50, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy13', x:350, y:-220, w:80, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy14', x:100, y:-270, w:80, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy15', x:225, y:-270, w:50, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy16', x:350, y:-270, w:50, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy17', x:475, y:-270, w:50, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy18', x:600, y:-270, w:80, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy19', x:475, y:-200, w:50, h:30, image: enemiespic2 }),
        new enemyTemplate({id:'enemy20', x:600, y:-200, w:50, h:30, image: enemiespic2 }),
    ];

    let renderEnemies = function(enemyList){

        for(let i=0; i < enemyList.length; i++){
            let enemy = enemyList[i];
            tx.drawImage(enemy.image, enemy.x, enemy.y += .5, enemy.w, enemy.h);
            launcher.hitDetectLowerlevel(enemy);
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

        this.gameStatus = {
            over: false,
            message: '',
            fillStyle: 'red',
            font:'italic bold 36px Arial, sans-serif',
        }

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
                this.hitDetect(m, i); 
                if(m.y <= 0){
                    this.misiles.splice(i, 1);
                }
            }
            if(enemies.length === 0){
                clearInterval(animateInterval);
                tx.fillStyle = 'yellow';
                tx.font = this.gameStatus.font;
                tx.fillText('you win!', cW*.5 -80, 50);
            }
        }
        this.hitDetect = function(m , mi){
            for(let i = 0; i < enemies.length;i++){
                let en = enemies[i];

                if(m.x <= en.x + en.w && m.x + m.w >= en.x &&
                    m.y >= en.y && m.y <= en.y + en.h){
                    enemies.splice(i, 1);
                    document.querySelector('.barr').innerHTML = 'Destroyed '+ en.id;
                }
            }
        }
        this.hitDetectLowerlevel = function(enemy){
            if(enemy.y > 550){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Enemy(s) have passed!';
            }
            if((enemy.y < this.y +25 && enemy.y > this.y -25)&&
            (enemy.x < this.x + 45 && enemy.x > this.x - 45)){
                this.gameStatus.over = true;
                this.gameStatus.message = 'you died!';
            }
            if(this.gameStatus.over === true){
                clearInterval(animateInterval);
                tx.fillStyle = this.gameStatus.fillStyle;
                tx.font = this.gameStatus.font;

                tx.fillText(this.gameStatus.message, cW* .5 -80, 50);
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

    //fire
    fire.addEventListener('mousedown',(e)=>{
        launcher.misiles.push({
            x: launcher.x + launcher.w * .5,
            y: launcher.y,
            w: 3,
            h: 10
        });
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
