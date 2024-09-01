var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
    var fontSize = 130;
    var content = "Raju\nDolly";



    textFont(createFont("Arial Bold"), fontSize);
    textAlign(CENTER, CENTER);
    fill(0);
    text(content, 10, 10, 580, 580);

    var bubbles = [];

    var particleColors = [
        color(247, 52, 72),
        color(40, 40, 40),
        color(36, 112, 166),
        color(72, 191, 242),
        color(192, 93, 245)
    ];

    var particles = (function() {
        var arr = [];
        for(var x = 0; x <= 600; x+= fontSize * 0.04) {
            for(var y = 0; y <= 600; y+= fontSize * 0.04) {
                if(get(x, y) === -16777216) {
                    arr.push({
                        x: x,
                        y: y,
                        bx: x,
                        by: y,
                        tx: 0,
                        ty: 0,
                        vx: 0.1,
                        vy: 0.1,
                        xoff: random(-3, 3),
                        yoff: random(-3, 3),
                        angle: radians(random(360)) | 0,
                        rot: random(-1, 1),
                        diameter: fontSize * 0.04,
                        color: particleColors[random(particleColors.length) | 0]
                    });
                }
            }
        }
        return arr;
    })();

    var displaceParticles = function() {
        for(var i = 0; i < particles.length; i++) {
            var p = particles[i];

            if(dist(p.x, p.y + 20 + sin(frameCount * 0.01) * 50, mouseX, mouseY) < 10) {
                p.tx = random(-40, 40);
                p.ty = random(-40, 40);

                p.vx = random(0.08, 0.12);
                p.vy = random(0.08, 0.12);
            }
        }
    };

    var runParticles = function() {
      pushMatrix();
        translate(0, 20 + sin(frameCount * 0.01) * 50);

          pushMatrix();
              translate(300, 300);
              rotate(radians(sin(frameCount * 0.02) * 5));
              translate(-300, -300);

              noStroke();

              for(var i = 0; i < particles.length; i++) {
                  var p = particles[i];
                  p.angle+= p.rot;

                  p.tx = lerp(p.tx, 0, p.vx);
                  p.ty = lerp(p.ty, 0, p.vy);

                  p.x = lerp(p.x, p.bx + p.tx, p.vx);
                  p.y = lerp(p.y, p.by + p.ty, p.vy);

                  translate(p.x, p.y);
                      rotate(radians(p.angle));
                      fill(p.color);
                      ellipse(p.xoff, p.yoff - p.diameter, p.diameter, p.diameter);
                      rotate(radians(-p.angle));
                  translate(-p.x, -p.y);

                  if(random() < 0.0001) {
                      bubbles.push({
                          x: p.x,
                          y: p.y - p.diameter,
                          color: p.color,
                          size: p.diameter * 1.2,
                          opacity: random(200, 255),
                          speed: random(0.8, 1.2)
                      });   
                  }
              }
          popMatrix();

          for(var j = bubbles.length - 1; j > 0; j--) {
              var bubble = bubbles[j];
              bubble.y-= bubble.speed;
              bubble.opacity-= 1;
              fill(bubble.color, bubble.opacity);
              ellipse(bubble.x, bubble.y, bubble.size, bubble.size);
              if(bubble.opacity <= 0) {
                  bubbles.splice(j, 1);   
              }
          }
      popMatrix();
    };

    draw = function() {
        background(244, 245, 184);
        
        fill(100, 20);
        ellipse(0, 600, 250, 250);
        ellipse(600, 600, 200, 200);
        fill(255, 30);
        arc(0, 600, 220, 220, 0, 360);
        arc(600, 600, 160, 160, 0, 360);
      
        runParticles();

        textSize(40);
        fill(25, 15);
        text("Move the mouse over\nthe text to displace", width * 0.5, 80);
    };

    mouseMoved = function() {
        displaceParticles();
    };
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);
