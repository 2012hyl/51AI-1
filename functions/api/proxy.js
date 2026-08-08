<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>像素猫动画</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #1a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
        }
        .loading-container {
            text-align: center;
            padding: 40px 20px;
        }
        .pixel-cat-wrapper {
            width: 120px;
            height: 120px;
            margin: 0 auto 16px;
            position: relative;
            display: block;
        }
        .pixel-unit {
            position: absolute;
            width: 5px;
            height: 5px;
        }
        .pixel-scene {
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            box-shadow:
                5px 100px 0 0 #8B5A2B, 10px 100px 0 0 #8B5A2B, 15px 100px 0 0 #8B5A2B, 20px 100px 0 0 #8B5A2B,
                25px 100px 0 0 #8B5A2B, 30px 100px 0 0 #8B5A2B, 35px 100px 0 0 #8B5A2B, 40px 100px 0 0 #8B5A2B,
                45px 100px 0 0 #8B5A2B, 50px 100px 0 0 #8B5A2B, 55px 100px 0 0 #8B5A2B, 60px 100px 0 0 #8B5A2B,
                65px 100px 0 0 #8B5A2B, 70px 100px 0 0 #8B5A2B, 75px 100px 0 0 #8B5A2B, 80px 100px 0 0 #8B5A2B,
                85px 100px 0 0 #8B5A2B, 90px 100px 0 0 #8B5A2B, 95px 100px 0 0 #8B5A2B, 100px 100px 0 0 #8B5A2B,
                105px 100px 0 0 #8B5A2B, 110px 100px 0 0 #8B5A2B,
                5px 105px 0 0 #8B5A2B, 10px 105px 0 0 #8B5A2B, 15px 105px 0 0 #8B5A2B, 20px 105px 0 0 #8B5A2B,
                25px 105px 0 0 #8B5A2B, 30px 105px 0 0 #8B5A2B, 35px 105px 0 0 #8B5A2B, 40px 105px 0 0 #8B5A2B,
                45px 105px 0 0 #8B5A2B, 50px 105px 0 0 #8B5A2B, 55px 105px 0 0 #8B5A2B, 60px 105px 0 0 #8B5A2B,
                65px 105px 0 0 #8B5A2B, 70px 105px 0 0 #8B5A2B, 75px 105px 0 0 #8B5A2B, 80px 105px 0 0 #8B5A2B,
                85px 105px 0 0 #8B5A2B, 90px 105px 0 0 #8B5A2B, 95px 105px 0 0 #8B5A2B, 100px 105px 0 0 #8B5A2B,
                105px 105px 0 0 #8B5A2B, 110px 105px 0 0 #8B5A2B,
                5px 110px 0 0 #8B5A2B, 10px 110px 0 0 #8B5A2B, 15px 110px 0 0 #8B5A2B, 20px 110px 0 0 #8B5A2B,
                25px 110px 0 0 #8B5A2B, 30px 110px 0 0 #8B5A2B, 35px 110px 0 0 #8B5A2B, 40px 110px 0 0 #8B5A2B,
                45px 110px 0 0 #8B5A2B, 50px 110px 0 0 #8B5A2B, 55px 110px 0 0 #8B5A2B, 60px 110px 0 0 #8B5A2B,
                65px 110px 0 0 #8B5A2B, 70px 110px 0 0 #8B5A2B, 75px 110px 0 0 #8B5A2B, 80px 110px 0 0 #8B5A2B,
                85px 110px 0 0 #8B5A2B, 90px 110px 0 0 #8B5A2B, 95px 110px 0 0 #8B5A2B, 100px 110px 0 0 #8B5A2B,
                105px 110px 0 0 #8B5A2B, 110px 110px 0 0 #8B5A2B,
                5px 115px 0 0 #8B5A2B, 10px 115px 0 0 #8B5A2B, 15px 115px 0 0 #8B5A2B, 20px 115px 0 0 #8B5A2B,
                25px 115px 0 0 #8B5A2B, 30px 115px 0 0 #8B5A2B, 35px 115px 0 0 #8B5A2B, 40px 115px 0 0 #8B5A2B,
                45px 115px 0 0 #8B5A2B, 50px 115px 0 0 #8B5A2B, 55px 115px 0 0 #8B5A2B, 60px 115px 0 0 #8B5A2B,
                65px 115px 0 0 #8B5A2B, 70px 115px 0 0 #8B5A2B, 75px 115px 0 0 #8B5A2B, 80px 115px 0 0 #8B5A2B,
                85px 115px 0 0 #8B5A2B, 90px 115px 0 0 #8B5A2B, 95px 115px 0 0 #8B5A2B, 100px 115px 0 0 #8B5A2B,
                105px 115px 0 0 #8B5A2B, 110px 115px 0 0 #8B5A2B,
                15px 15px 0 0 #333, 20px 15px 0 0 #333, 25px 15px 0 0 #333, 30px 15px 0 0 #333,
                35px 15px 0 0 #333, 40px 15px 0 0 #333, 45px 15px 0 0 #333, 50px 15px 0 0 #333,
                55px 15px 0 0 #333, 60px 15px 0 0 #333,
                15px 20px 0 0 #333, 60px 20px 0 0 #333,
                15px 25px 0 0 #333, 60px 25px 0 0 #333,
                15px 30px 0 0 #333, 60px 30px 0 0 #333,
                15px 35px 0 0 #333, 60px 35px 0 0 #333,
                15px 40px 0 0 #333, 60px 40px 0 0 #333,
                15px 45px 0 0 #333, 60px 45px 0 0 #333,
                15px 50px 0 0 #333, 60px 50px 0 0 #333,
                15px 55px 0 0 #333, 60px 55px 0 0 #333,
                15px 60px 0 0 #333, 60px 60px 0 0 #333,
                15px 65px 0 0 #333, 60px 65px 0 0 #333,
                15px 70px 0 0 #333, 60px 70px 0 0 #333,
                15px 75px 0 0 #333, 60px 75px 0 0 #333,
                15px 80px 0 0 #333, 60px 80px 0 0 #333,
                15px 85px 0 0 #333, 20px 85px 0 0 #333, 25px 85px 0 0 #333, 30px 85px 0 0 #333,
                35px 85px 0 0 #333, 40px 85px 0 0 #333, 45px 85px 0 0 #333, 50px 85px 0 0 #333,
                55px 85px 0 0 #333, 60px 85px 0 0 #333,
                20px 20px 0 0 #A8D8EA, 25px 20px 0 0 #A8D8EA, 30px 20px 0 0 #A8D8EA, 35px 20px 0 0 #A8D8EA,
                40px 20px 0 0 #A8D8EA, 45px 20px 0 0 #A8D8EA, 50px 20px 0 0 #A8D8EA, 55px 20px 0 0 #A8D8EA,
                20px 25px 0 0 #A8D8EA, 25px 25px 0 0 #A8D8EA, 30px 25px 0 0 #A8D8EA, 35px 25px 0 0 #A8D8EA,
                40px 25px 0 0 #A8D8EA, 45px 25px 0 0 #A8D8EA, 50px 25px 0 0 #A8D8EA, 55px 25px 0 0 #A8D8EA,
                20px 30px 0 0 #A8D8EA, 25px 30px 0 0 #A8D8EA, 30px 30px 0 0 #A8D8EA, 35px 30px 0 0 #A8D8EA,
                40px 30px 0 0 #A8D8EA, 45px 30px 0 0 #A8D8EA, 50px 30px 0 0 #A8D8EA, 55px 30px 0 0 #A8D8EA,
                20px 35px 0 0 #A8D8EA, 25px 35px 0 0 #A8D8EA, 30px 35px 0 0 #A8D8EA, 35px 35px 0 0 #A8D8EA,
                40px 35px 0 0 #A8D8EA, 45px 35px 0 0 #A8D8EA, 50px 35px 0 0 #A8D8EA, 55px 35px 0 0 #A8D8EA,
                20px 40px 0 0 #A8D8EA, 25px 40px 0 0 #A8D8EA, 30px 40px 0 0 #A8D8EA, 35px 40px 0 0 #A8D8EA,
                40px 40px 0 0 #A8D8EA, 45px 40px 0 0 #A8D8EA, 50px 40px 0 0 #A8D8EA, 55px 40px 0 0 #A8D8EA,
                20px 45px 0 0 #A8D8EA, 25px 45px 0 0 #A8D8EA, 30px 45px 0 0 #A8D8EA, 35px 45px 0 0 #A8D8EA,
                40px 45px 0 0 #A8D8EA, 45px 45px 0 0 #A8D8EA, 50px 45px 0 0 #A8D8EA, 55px 45px 0 0 #A8D8EA,
                20px 50px 0 0 #A8D8EA, 25px 50px 0 0 #A8D8EA, 30px 50px 0 0 #A8D8EA, 35px 50px 0 0 #A8D8EA,
                40px 50px 0 0 #A8D8EA, 45px 50px 0 0 #A8D8EA, 50px 50px 0 0 #A8D8EA, 55px 50px 0 0 #A8D8EA,
                20px 55px 0 0 #A8D8EA, 25px 55px 0 0 #A8D8EA, 30px 55px 0 0 #A8D8EA, 35px 55px 0 0 #A8D8EA,
                40px 55px 0 0 #A8D8EA, 45px 55px 0 0 #A8D8EA, 50px 55px 0 0 #A8D8EA, 55px 55px 0 0 #A8D8EA,
                20px 60px 0 0 #A8D8EA, 25px 60px 0 0 #A8D8EA, 30px 60px 0 0 #A8D8EA, 35px 60px 0 0 #A8D8EA,
                40px 60px 0 0 #A8D8EA, 45px 60px 0 0 #A8D8EA, 50px 60px 0 0 #A8D8EA, 55px 60px 0 0 #A8D8EA,
                20px 65px 0 0 #A8D8EA, 25px 65px 0 0 #A8D8EA, 30px 65px 0 0 #A8D8EA, 35px 65px 0 0 #A8D8EA,
                40px 65px 0 0 #A8D8EA, 45px 65px 0 0 #A8D8EA, 50px 65px 0 0 #A8D8EA, 55px 65px 0 0 #A8D8EA,
                20px 70px 0 0 #A8D8EA, 25px 70px 0 0 #A8D8EA, 30px 70px 0 0 #A8D8EA, 35px 70px 0 0 #A8D8EA,
                40px 70px 0 0 #A8D8EA, 45px 70px 0 0 #A8D8EA, 50px 70px 0 0 #A8D8EA, 55px 70px 0 0 #A8D8EA,
                20px 75px 0 0 #A8D8EA, 25px 75px 0 0 #A8D8EA, 30px 75px 0 0 #A8D8EA, 35px 75px 0 0 #A8D8EA,
                40px 75px 0 0 #A8D8EA, 45px 75px 0 0 #A8D8EA, 50px 75px 0 0 #A8D8EA, 55px 75px 0 0 #A8D8EA,
                25px 85px 0 0 #555, 30px 85px 0 0 #555, 35px 85px 0 0 #555, 40px 85px 0 0 #555, 45px 85px 0 0 #555, 50px 85px 0 0 #555,
                60px 90px 0 0 #666, 65px 90px 0 0 #666, 70px 90px 0 0 #666, 75px 90px 0 0 #666, 80px 90px 0 0 #666,
                60px 95px 0 0 #666, 65px 95px 0 0 #666, 70px 95px 0 0 #666, 75px 95px 0 0 #666, 80px 95px 0 0 #666,
                62px 92px 0 0 #fff, 72px 92px 0 0 #fff,
                70px 60px 0 0 #FCA503, 75px 60px 0 0 #FCA503, 80px 60px 0 0 #FCA503, 85px 60px 0 0 #FCA503, 90px 60px 0 0 #FCA503, 95px 60px 0 0 #FCA503, 100px 60px 0 0 #FCA503,
                70px 65px 0 0 #FCA503, 75px 65px 0 0 #FCA503, 80px 65px 0 0 #FCA503, 85px 65px 0 0 #FCA503, 90px 65px 0 0 #FCA503, 95px 65px 0 0 #FCA503, 100px 65px 0 0 #FCA503,
                70px 70px 0 0 #FCA503, 75px 70px 0 0 #FCA503, 80px 70px 0 0 #FCA503, 85px 70px 0 0 #FCA503, 90px 70px 0 0 #FCA503, 95px 70px 0 0 #FCA503, 100px 70px 0 0 #FCA503,
                70px 75px 0 0 #FCA503, 75px 75px 0 0 #FCA503, 80px 75px 0 0 #FCA503, 85px 75px 0 0 #FCA503, 90px 75px 0 0 #FCA503, 95px 75px 0 0 #FCA503, 100px 75px 0 0 #FCA503,
                70px 80px 0 0 #FCA503, 75px 80px 0 0 #FCA503, 80px 80px 0 0 #FCA503, 85px 80px 0 0 #FCA503, 90px 80px 0 0 #FCA503, 95px 80px 0 0 #FCA503, 100px 80px 0 0 #FCA503,
                70px 85px 0 0 #FCA503, 75px 85px 0 0 #FCA503, 80px 85px 0 0 #FCA503, 85px 85px 0 0 #FCA503, 90px 85px 0 0 #FCA503, 95px 85px 0 0 #FCA503, 100px 85px 0 0 #FCA503,
                70px 90px 0 0 #FCA503, 75px 90px 0 0 #FCA503, 80px 90px 0 0 #FCA503, 85px 90px 0 0 #FCA503, 90px 90px 0 0 #FCA503, 95px 90px 0 0 #FCA503, 100px 90px 0 0 #FCA503,
                70px 95px 0 0 #FCA503, 75px 95px 0 0 #FCA503, 80px 95px 0 0 #FCA503, 85px 95px 0 0 #FCA503, 90px 95px 0 0 #FCA503, 95px 95px 0 0 #FCA503, 100px 95px 0 0 #FCA503,
                75px 25px 0 0 #FCA503, 80px 25px 0 0 #FCA503, 85px 25px 0 0 #FCA503, 90px 25px 0 0 #FCA503, 95px 25px 0 0 #FCA503,
                75px 30px 0 0 #FCA503, 80px 30px 0 0 #FCA503, 85px 30px 0 0 #FCA503, 90px 30px 0 0 #FCA503, 95px 30px 0 0 #FCA503,
                75px 35px 0 0 #FCA503, 80px 35px 0 0 #FCA503, 85px 35px 0 0 #FCA503, 90px 35px 0 0 #FCA503, 95px 35px 0 0 #FCA503,
                75px 40px 0 0 #FCA503, 80px 40px 0 0 #FCA503, 85px 40px 0 0 #FCA503, 90px 40px 0 0 #FCA503, 95px 40px 0 0 #FCA503,
                75px 45px 0 0 #FCA503, 80px 45px 0 0 #FCA503, 85px 45px 0 0 #FCA503, 90px 45px 0 0 #FCA503, 95px 45px 0 0 #FCA503,
                75px 50px 0 0 #FCA503, 80px 50px 0 0 #FCA503, 85px 50px 0 0 #FCA503, 90px 50px 0 0 #FCA503, 95px 50px 0 0 #FCA503,
                75px 55px 0 0 #FCA503, 80px 55px 0 0 #FCA503, 85px 55px 0 0 #FCA503, 90px 55px 0 0 #FCA503, 95px 55px 0 0 #FCA503,
                75px 20px 0 0 #FCA503, 80px 20px 0 0 #FCA503, 90px 20px 0 0 #FCA503, 95px 20px 0 0 #FCA503,
                75px 20px 0 0 #FFB8B8, 90px 20px 0 0 #FFB8B8,
                80px 35px 0 0 #fff, 85px 35px 0 0 #fff, 80px 40px 0 0 #fff, 85px 40px 0 0 #fff,
                82px 37px 0 0 #000, 87px 37px 0 0 #000,
                75px 30px 0 0 #000, 80px 30px 0 0 #000, 85px 30px 0 0 #000, 90px 30px 0 0 #000, 95px 30px 0 0 #000,
                75px 35px 0 0 #000, 95px 35px 0 0 #000,
                75px 40px 0 0 #000, 95px 40px 0 0 #000,
                75px 45px 0 0 #000, 80px 45px 0 0 #000, 85px 45px 0 0 #000, 90px 45px 0 0 #000, 95px 45px 0 0 #000,
                85px 50px 0 0 #FF9999,
                82px 55px 0 0 #222, 87px 55px 0 0 #222,
                85px 65px 0 0 #E74C3C, 85px 70px 0 0 #E74C3C, 85px 75px 0 0 #E74C3C,
                70px 100px 0 0 #FCA503, 75px 100px 0 0 #FCA503,
                70px 105px 0 0 #FCA503, 75px 105px 0 0 #FCA503,
                110px 85px 0 0 #6B4226, 115px 85px 0 0 #6B4226,
                110px 90px 0 0 #6B4226, 115px 90px 0 0 #6B4226,
                110px 95px 0 0 #6B4226, 115px 95px 0 0 #6B4226,
                110px 100px 0 0 #6B4226, 115px 100px 0 0 #6B4226,
                110px 80px 0 0 #A0522D, 115px 80px 0 0 #A0522D,
                120px 90px 0 0 #6B4226, 120px 95px 0 0 #6B4226;
        }
        .pixel-hand {
            top: 60px;
            left: 60px;
            width: 0;
            height: 0;
            box-shadow:
                0 0 0 0 #FCA503, 5px 0 0 0 #FCA503,
                0 5px 0 0 #FCA503, 5px 5px 0 0 #FCA503;
            animation: typing 0.3s ease-in-out infinite alternate;
        }
        @keyframes typing {
            from { transform: translateY(0); }
            to { transform: translateY(5px); }
        }
        .pixel-mouth {
            top: 55px;
            left: 82px;
            width: 0;
            height: 0;
            box-shadow:
                0 0 0 0 #222, 5px 0 0 0 #222,
                0 5px 0 0 #222, 5px 5px 0 0 #222;
            animation: yawn 3s ease-in-out infinite;
            opacity: 0;
        }
        @keyframes yawn {
            0%, 80%, 100% { opacity: 0; transform: scale(1); }
            85%, 95% { opacity: 1; transform: scale(1.5); }
        }
        .pixel-screen-glow {
            top: 20px;
            left: 20px;
            width: 40px;
            height: 65px;
            background: rgba(168, 216, 234, 0.5);
            animation: screenFlicker 0.15s ease-in-out infinite alternate;
            pointer-events: none;
        }
        @keyframes screenFlicker {
            from { opacity: 0.3; }
            to { opacity: 0.7; }
        }
        .pixel-steam {
            top: 70px;
            left: 110px;
            width: 0;
            height: 0;
            box-shadow:
                0 -5px 0 0 rgba(255,255,255,0.7), 5px -10px 0 0 rgba(255,255,255,0.5);
            animation: steamRise 1.5s ease-in-out infinite;
        }
        @keyframes steamRise {
            0% { transform: translateY(0) scale(1); opacity: 0.8; }
            50% { transform: translateY(-8px) scale(1.2); opacity: 0.4; }
            100% { transform: translateY(-16px) scale(1.5); opacity: 0; }
        }
        .loading-text {
            color: #a0a0b8;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="loading-container">
        <div class="pixel-cat-wrapper" id="catWrapper">
            <div class="pixel-unit pixel-scene"></div>
            <div class="pixel-unit pixel-hand" style="top:60px;left:60px;"></div>
            <div class="pixel-unit pixel-mouth" style="top:55px;left:82px;"></div>
            <div class="pixel-unit pixel-screen-glow" style="top:20px;left:20px;"></div>
            <div class="pixel-unit pixel-steam" style="top:70px;left:110px;"></div>
        </div>
        <div class="loading-text">AI 正在为你设计旅行方案……</div>
    </div>

    <!-- 修复移动端 box-shadow 失效的兼容脚本 -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var scene = document.querySelector('.pixel-scene');
            if (scene) {
                var shadow = window.getComputedStyle(scene).boxShadow;
                var entries = shadow.split(', ');
                var parent = scene.parentNode;
                
                entries.forEach(function(entry) {
                    var parts = entry.trim().split(' ');
                    if (parts.length >= 5) {
                        var x = parseInt(parts[0]);
                        var y = parseInt(parts[1]);
                        var color = parts[4];
                        var div = document.createElement('div');
                        div.className = 'pixel-unit';
                        div.style.left = x + 'px';
                        div.style.top = y + 'px';
                        div.style.backgroundColor = color;
                        parent.appendChild(div);
                    }
                });
                scene.style.display = 'none';
            }
        });
    </script>
</body>
</html>
