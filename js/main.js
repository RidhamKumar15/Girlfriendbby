$(document).ready(function () {
    // Ensure CONFIG is loaded before using
    if (typeof CONFIG === 'undefined') {
        console.error("CONFIG is not defined. Make sure config.js is loaded before main.js.");
        return;
    }

    // process bar
    setTimeout(function () {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({ 'overflow': 'visible' });
    }, 600);

    init(); // move init() inside ready
});

function init() {
    $('#titleWeb').html(CONFIG.titleWeb);
    $('#title').text(CONFIG.title);
    $('#desc').text(CONFIG.desc);
    $('#yes').text(CONFIG.btnYes);
    $('#no').text(CONFIG.btnNo);

    const xYes = (0.9 * $(window).width() - $('#yes').width() - $('#no').width()) / 2;
    const xNo = xYes + $('#yes').width() + 0.1 * $(window).width();
    const y = 0.75 * $(window).height();

    $('#yes').css({ left: xYes, top: y });
    $('#no').css({ left: xNo, top: y });
}

function firstQuestion() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/logi.gif',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
    }).then(function () {
        $('.content').fadeIn(200);
        new Audio('sound/sound.mp3').play();
    });
}

function switchButton() {
    new Audio('sound/duck.mp3').play();
    const leftNo = $('#no').css("left");
    const topNo = $('#no').css("top");
    const leftYes = $('#yes').css("left");
    const topYes = $('#yes').css("top");
    $('#no').css({ left: leftYes, top: topYes });
    $('#yes').css({ left: leftNo, top: topNo });
}

function moveButton() {
    new Audio('sound/Swish1.mp3').play();
    const x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    const y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    $('#no').css({ left: `${x}px`, top: `${y}px` });
}

let n = 0;
$('#no').mousemove(function () {
    if (Math.random() < 0.5 || n === 1) {
        switchButton();
    } else {
        moveButton();
    }
    n++;
});

$('#no').click(() => {
    if (screen.width >= 900) switchButton();
});

function textGenerate() {
    const text = CONFIG.reply;
    const input = $('#txtReason');
    let currentVal = input.val() || "";
    const nextChar = text[currentVal.length];
    if (nextChar) {
        input.val(currentVal + nextChar);
        setTimeout(textGenerate, 50);
    }
}

$('#yes').click(function () {
    new Audio('sound/tick.mp3').play();
    Swal.fire({
        title: CONFIG.question,
        html: "<input type='text' class='form-control' id='txtReason' onmousemove='textGenerate()' placeholder='Whyyy 🥺'>",
        width: 900,
        padding: '3em',
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
            rgba(0,0,123,0.4)
            url("img/giphy2.gif")
            left top
            no-repeat
        `,
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                width: 900,
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            });
        }
    });
});
