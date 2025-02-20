$(document).ready(function () {
    new WOW({
        boxClass:     'wow',
        animateClass: 'animate__animated',
        offset:       200,
        mobile:       true,
        live:         true
    }).init();

    $('.autopark_list').slick({
        variableWidth: true,
        centerMode: true
    });

    $('.feedback').slick({
        dots: true,
        infinite: true,
        variableWidth: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        prevArrow: $('.prev_arrow'),
        nextArrow: $('.next_arrow'),
        appendDots: $('#dots'),
        responsive: [
            {
                breakpoint: 758,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.menu_burger').click(function () {
        $('.menu_320__wrapper').css('display', 'block');
        $('.menu_320').css({'display': 'flex', 'flex-direction': 'column'});
    });
    $('.close_320').click(function () {
        $('.menu_320__wrapper').css('display', 'none');
        $('.menu_320').css('display', 'none');
    });

    //change price and name on swipe
    $('.autopark_list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        if (nextSlide > currentSlide) {
            console.log('Swiped forward');
            display_price();
        } else if (nextSlide < currentSlide) {
            console.log('Swiped backward');
            display_price();
        } else {
            console.log('No change (possibly a re-initialization)');
        }
    });

    //Изменяем отображаемую цену аренды авто
    //Var declaration
    let slides = [$('#slide_1'), $('#slide_2'), $('#slide_3'), $('#slide_4')];
    let prices = [$('#price_1'), $('#price_2'), $('#price_3'), $('#price_4')];
    let titles = [$('#title_1'), $('#title_2'), $('#title_3'), $('#title_4')];

    function display_price() {
        for (let i = 0; i < slides.length; i++) {
            prices[i].css('display', 'none');
           titles[i].css('display', 'none');
            if (slides[i].hasClass("slick-active")) {
                prices[i].css('display', 'block');
                titles[i].css('display', 'block');
            }
        }
    }

    $('.slick-next').click(function () {
        display_price();
    })
    $('.slick-prev').click(function () {
        display_price();
    })

    //error validation function
    function errorValidation(data) {
        let Error = false;
        for (let i = 0; i < data.length; i++) {
            if (!data[i].val()) {
                Error = true;
                data[i].next().show();
                data[i].css('border', '1px solid red');
            } else {
                //прячем сообщение об ошибке и перекрашиваем рамку
                data[i].css('border', '1px solid #454545');
            }
        }
        return Error;
    }
    // При повторном открытии окна прячем ошибки
    function errorReset(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].next().hide();
            data[i].css('border', '1px solid #454545');
        }
    }

    //CALLBACK
    //var declarations
    let callbackName = $('#callback_name');
    let callbackPhone = $('#callback_phone');
    let callbackData = [callbackName, callbackPhone];

    //open popup callback
    $('#order_call').click(function () {
        $('.callback_popup_wrapper').css("display", "block");
        $('.callback_popup').css("display", "block");
        errorReset(callbackData);
    });

    //callback data validation
    $('#submit_callback').click(function () {

        $('.error-input').hide();
        let hasError = errorValidation(callbackData);

        if (!hasError) {
            //ajax
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: callbackName.val(), phone: callbackPhone.val()}
            })

                .done(function (msg) {
                    console.log(msg);
                    if (msg && msg.hasOwnProperty('success') && msg.success === 1) {
                        $('#callback_form_title').css('display', 'none');
                        $('#order_callback').css('display', 'none');
                        $('#submit_callback').css('display', 'none');
                        $('#callback_order__success').css('display', 'block');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                })
        }
    })

    //ORDER FORM
    //var declarations
    let car = $('#your_order');
    let startTime = $('#start_time');
    let endTime = $('#end_time');
    let destination = $('#destination');
    let name = $('#your_name');
    let phone = $('#your_phone');
    let email = $('#your_email');
    let orderData = [car, startTime, endTime, destination, name, phone, email];

    //open popup order
    $('#fillout_form').click(function () {
        $('.order_popup_wrapper').css("display", "block");
        $('.order_popup').css("display", "block");
        errorReset(orderData);
    });

    $('.btn_autopark_actions').click(function () {
        $('.order_popup_wrapper').css("display", "block");
        $('.order_popup').css("display", "block");
        errorReset(orderData);
    })


    //order data validation
    $('#submit_order').click(function () {
        $('.error-input').hide();
        let hasError = errorValidation(orderData);

        if (!hasError) {
            //ajax
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: name.val(), phone: phone.val()/*, email: email.val(), car: car, startTime: startTime, endTime: endTime*/}
            })

                .done(function (msg) {
                    console.log(msg);
                    if (msg && msg.hasOwnProperty('success') && msg.success === 1) {
                        $('#car_order_form__title').css('display', 'none');
                        $('#car_order__form').css('display', 'none');
                        $('#submit_order').css('display', 'none');
                        $('.oferta').css('display', 'none');
                        $('#car_order__success').css('display', 'block');
                        $('.order_popup').css('top', '50%');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                })
        }

    })

    //close all popups
    $('.close').click(function () {
        $('.order_popup_wrapper').css("display", "none");
        $('.order_popup').css("display", "none");
        $('.callback_popup_wrapper').css("display", "none");
        $('.callback_popup').css("display", "none");
    })

})


