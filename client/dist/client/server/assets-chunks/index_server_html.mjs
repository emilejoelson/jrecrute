export default `<!DOCTYPE html>
<html lang="en">
  <head><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <meta charset="utf-8"/>
    <title>Recrutement</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <style>@font-face{font-family:'Nunito';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOOaBXso.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Nunito';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIMeaBXso.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Nunito';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOuaBXso.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Nunito';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIO-aBXso.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Nunito';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofINeaB.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Nunito';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOOaBXso.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Nunito';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIMeaBXso.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Nunito';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOuaBXso.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Nunito';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIO-aBXso.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Nunito';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofINeaB.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Nunito';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOOaBXso.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Nunito';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIMeaBXso.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Nunito';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOuaBXso.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Nunito';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIO-aBXso.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Nunito';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofINeaB.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}@font-face{font-family:'Nunito';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOOaBXso.woff2) format('woff2');unicode-range:U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;}@font-face{font-family:'Nunito';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIMeaBXso.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}@font-face{font-family:'Nunito';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIOuaBXso.woff2) format('woff2');unicode-range:U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;}@font-face{font-family:'Nunito';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofIO-aBXso.woff2) format('woff2');unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}@font-face{font-family:'Nunito';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/nunito/v26/XRXV3I6Li01BKofINeaB.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}</style>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      #preloader {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
        z-index: 9999;
        overflow: hidden;
      }

      .particle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
        animation: float 4s infinite;
      }

      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(-100px) translateX(100px);
          opacity: 0;
        }
      }

      .loader-content {
        position: relative;
        z-index: 1;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        border: 1px solid rgba(255, 255, 255, 0.18);
        max-width: 90%;
        margin: 0 auto;
      }

      @media screen and (max-width: 768px) {
        .loader-content {
          padding: 1.5rem;
          border-radius: 15px;
          max-width: 95%;
        }
      }

      @media screen and (max-width: 480px) {
        .loader-content {
          padding: 1rem;
          border-radius: 10px;
          max-width: 100%;
        }
      }

      img {
        max-width: 70px !important;
        height: 50px;
        display: block;
        filter: drop-shadow(0 0 10px rgba(167, 79, 165, 0.5));
      }

      .text-gradient {
        background: linear-gradient(90deg, #fff 0%, #a74fa5 50%, #4a4a4a 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% auto;
        animation: gradient 2s linear infinite;
      }

      @keyframes gradient {
        to {
          background-position: 200% center;
        }
      }

      .pulse {
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
    </style>
  <link rel="stylesheet" href="styles-7PZJBGVF.css"></head>
  <body class="font-['Nunito']"><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script>
    <app-root style="display: none"></app-root>
    <div id="preloader">
      <div class="loader-content pulse">
        <div class="flex items-center gap-2">
          <img class="custom-650:w-[50px] custom-650:h-[70px] object-contain" src="assets/icons/cc-logo.png" alt="ConsultCollab"/>
          <span class="flex flex-col">
            <span class="md:text-3xl text-xl font-bold md:font-extrabold text-gradient">Consult Collab</span>
            <span class="md:text-3xl text-xl font-bold md:font-extrabold text-gradient">Recrutement</span>
          </span>
        </div>
      </div>
    </div>

    <script>
      document.addEventListener("DOMContentLoaded", function () {
        function createParticle() {
          const preloader = document.getElementById("preloader");
          if (!preloader) return; // Exit if the element does not exist

          const particle = document.createElement("div");
          particle.className = "particle";

          // Random size between 5 and 20 pixels
          const size = Math.random() * 15 + 5;
          particle.style.width = \`\${size}px\`;
          particle.style.height = \`\${size}px\`;

          // Random position
          particle.style.left = \`\${Math.random() * 100}%\`;
          particle.style.top = \`\${Math.random() * 100}%\`;

          // Random animation duration
          particle.style.animationDuration = \`\${Math.random() * 3 + 2}s\`;

          preloader.appendChild(particle);

          // Remove particle after animation
          setTimeout(() => {
            particle.remove();
          }, 4000);
        }

        // Create particles at intervals
        setInterval(createParticle, 200);

        // Create initial batch of particles
        for (let i = 0; i < 20; i++) {
          createParticle();
        }
      });
    </script>
  <link rel="modulepreload" href="chunk-6B5O7EWD.js"><link rel="modulepreload" href="chunk-4D55QW55.js"><link rel="modulepreload" href="chunk-WV5MKJUV.js"><link rel="modulepreload" href="chunk-FFFY2H77.js"><link rel="modulepreload" href="chunk-44M466FD.js"><link rel="modulepreload" href="chunk-QCKORCBF.js"><link rel="modulepreload" href="chunk-RIV23V2O.js"><link rel="modulepreload" href="chunk-OZJJMYSU.js"><script src="polyfills-FFHMD2TL.js" type="module"></script><script src="main-W6N54ZFG.js" type="module"></script></body>
</html>
`;