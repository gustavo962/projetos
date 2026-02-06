(() => {
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let W, H;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  window.addEventListener("resize", resize);
  resize();

  // CONFIG — fundo suave
  const COUNT = 200;
  const MAX_R = 1.4;     // tamanho pequeno
  const SPEED = 0.18;    // movimento lento

  const rand = (a,b)=>Math.random()*(b-a)+a;

  const p = Array.from({length: COUNT}, () => ({
    x: rand(0,W),
    y: rand(0,H),
    r: rand(0.4, MAX_R),
    a: rand(0.15, 0.38),
    vx: rand(-SPEED, SPEED),
    vy: rand(-SPEED, SPEED)
  }));

  function step(){
    ctx.clearRect(0,0,W,H);

    for(const o of p){
      o.x += o.vx;
      o.y += o.vy;

      if(o.x<0) o.x=W;
      if(o.x>W) o.x=0;
      if(o.y<0) o.y=H;
      if(o.y>H) o.y=0;

      ctx.beginPath();
      ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(180,140,255,${o.a})`;
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  step();
})();
