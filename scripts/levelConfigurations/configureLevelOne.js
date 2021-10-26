let loadLevelOne = function(){

    // ===== TODO =====: the best way to determine platform specs would be to 
    // find the size of the users screen and use percentages of it rather than static pixels


    //platform specs
    let platformOnePosX = 0;
    let platformOnePosY = 500;
    let platformOneWidth = 500;
    let platformOneHeight = 100;

    let platformTwoPosX = 1000;
    let platformTwoPosY = 600;
    let platformTwoWidth = 500;
    let platformTwoHeight = 100;

    let platformThreePosX = 600;
    let platformThreePosY = 350;
    let platformThreeWidth = 300;
    let platformThreeHeight = 50;
    //player specs
    let playerPosX = 0;
    let playerPosY = platformOnePosY - 500;
    let playerHeight = platformOneHeight+50;
    let playerWidth = 50;
    let playerVolX = 0;
    let playerVolY = 0;

    let platformOne = new BasicPlatform(platformOnePosX, platformOnePosY, platformOneWidth, platformOneHeight);
    let platformTwo = new BasicPlatform(platformTwoPosX, platformTwoPosY, platformTwoWidth, platformTwoHeight);
    let platformThree = new BasicPlatform(platformThreePosX, platformThreePosY, platformThreeWidth, platformThreeHeight);
    let playerModel = new Player(playerHeight, playerWidth, playerPosX, playerPosY, playerVolX, playerVolY);

    let gameCanvas = document.getElementById('gameCanvas');

    let levelOneString = `
        <div class="levelContainer">
            <div id="playerAvatar"></div>
            <div class="platform basicPlatform" id="levelOneBasicPlatformOne"></div>
            <div class="platform basicPlatform" id="levelOneBasicPlatformTwo"></div>
            <div class="platform basicPlatform" id="levelOneBasicPlatformThree"></div>
        </div>
    `;

    gameCanvas.innerHTML = levelOneString;

    document.getElementById('levelOneBasicPlatformOne').style.width = platformOne.width + "px";
    document.getElementById('levelOneBasicPlatformOne').style.height = platformOne.height + "px";
    document.getElementById('levelOneBasicPlatformOne').style.left = platformOne.posX + "px";
    document.getElementById('levelOneBasicPlatformOne').style.top = platformOne.posY + "px";

    document.getElementById('levelOneBasicPlatformTwo').style.width = platformTwo.width + "px";
    document.getElementById('levelOneBasicPlatformTwo').style.height = platformTwo.height + "px";
    document.getElementById('levelOneBasicPlatformTwo').style.left = platformTwo.posX + "px";
    document.getElementById('levelOneBasicPlatformTwo').style.top = platformTwo.posY + "px";

    document.getElementById('levelOneBasicPlatformThree').style.width = platformThree.width + "px";
    document.getElementById('levelOneBasicPlatformThree').style.height = platformThree.height + "px";
    document.getElementById('levelOneBasicPlatformThree').style.left = platformThree.posX + "px";
    document.getElementById('levelOneBasicPlatformThree').style.top = platformThree.posY + "px";

    document.getElementById('playerAvatar').style.left = playerModel.posX + "px";
    document.getElementById('playerAvatar').style.top = playerModel.posY + "px";


    console.log("LOADED LEVEL ONE");
    console.log(document.getElementById('levelOneBasicPlatformOne').style.width)
    console.log(platformOne.width)
    // console.log(document.getElementById('levelOneBasicPlatformOne').style.width)

    let levelData = {
        playerModel: playerModel,
        playerStartPos: {
            x: playerModel.posX,
            y: playerModel.posY,
        },
        platforms: [platformOne, platformTwo, platformThree],
    }
    return levelData;
}