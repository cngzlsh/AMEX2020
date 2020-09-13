// imports
const { Botkit, BotkitConversation } = require('botkit');
var fs = require('fs');

// read our destinations dataset
var all_dest = fs.readFileSync('./features/data.csv')
    .toString()
    .split('\n')
    .map(e => e.trim())
    .map(e => e.split(',').map(e => e.trim()));
console.log(Number(all_dest[1][6])); // test read


// initialise parameters

var CostVector = 0;
var CultureVector = 0;
var CultureWeight = 0;
var WaterVector = 0;
var WaterWeight = 0;
var MountainVector = 0;
var MountainWeight = 0;
var NightlifeVector = 0;
var NightlifeWeight = 0;
var score = 0;
var first_city = '';
var first_country = '';
var second_city = '';
var second_country = '';
var third_city = '';
var third_country = '';

// main dialog

module.exports = function( controller ) {
    let convo = new BotkitConversation( 'recommender', controller );

    convo.say('Welcome to Lonely Planet Chatbot.\nWe are here to find the best travel destination for you.');
    convo.ask('What is your name?', async(response, convo, bot) => {
        await bot.say('Nice to meet you, ' + response +'!');
       }, {key: 'name'});
    
    // asking cost
    convo.addAction('Cost');
    convo.addMessage('OK, {{vars.name}}, First question:', 'Cost');
    convo.addQuestion('Are you looking for somewhere luxurious? (yes/no)' , [
        {
            pattern: 'yes',
            handler: async(response, convo, bot) => {
                CostVector = 100;
                console.log(`cost is ${CostVector}`)
                await bot.say('Nice! Looks like someone is ready to splash some cash!')
                return await convo.gotoThread('Culture');
            }
        },
        {
            pattern: 'no',
            handler: async(response, convo, bot) => {
                CostVector = 0;
                await bot.say('Travelling on a budget is great fun!')
                return await convo.gotoThread('Culture');
            }
        },
        {
            default: true,
            handler: async(response, convo, bot) => {
                await bot.say('I did not understand that. Please try again.');
                return await convo.repeat();
            }
        }
    ], 'costanswer','Cost');

    
    // asking culture
    convo.addAction('Culture');
    convo.addQuestion('Are you interested in culture and history, {{vars.name}}? (yes/no/idm)', [
        {
            pattern: 'yes',
            handler: async(response, convo, bot) => {
                CultureVector = 100;
                CultureWeight = 1;
                await bot.say('Me too! I love visiting cultural heritages.');
                return await convo.gotoThread('Water');
            }
        },
        {
            pattern: 'no',
            handler: async(response, convo, bot) => {
                CultureVector = 0;
                CultureWeight = 1;
                await bot.say('Sometimes it gets boring visiting museums, doesn\'t it?');
                return await convo.gotoThread('Water');
            }
        },
        {
            pattern: 'idm',
            handler: async(response, convo, bot) => {
                CultureWeight = 0;
                return await convo.gotoThread('Water');
            }
        },
        {
            default: true,
            handler: async(response, convo, bot) => {
                await bot.say('I did not understand that. Please try again.');
                return await convo.repeat();
            }
        }
    ], 'cultureanswer','Culture');

    // asking waterscape
     convo.addAction('Water');
     convo.addQuestion('Do you want to go somewhere near water, such as lakeside or seaside? (yes/no/idm)', [
        {
            pattern: 'yes',
            handler: async(response, convo, bot) => {
                WaterVector = 100;
                WaterWeight = 1;
                await bot.say('Don\'t forget to bring your swimming gear!');
                return await convo.gotoThread('Mountain');
            }
        },
        {
            pattern: 'no',
            handler: async(response, convo, bot) => {
                WaterVector = 0;
                WaterWeight = 1;
                await bot.say('OK, noted.');
                return await convo.gotoThread('Mountain');
            }
        },
        {
            pattern: 'idm',
            handler: async(response, convo, bot) => {
                WaterWeight = 0;
                return await convo.gotoThread('Mountain');
            }
        },
        {
            default: true,
            handler: async(response, convo, bot) => {
                await bot.say('I did not understand that. Please try again.');
                return await convo.repeat();
            }
        }
    ], 'wateranswer', 'Water');


    // asking mountain
    convo.addAction('Mountain');
    convo.addQuestion('Are you a big fan of mountains, {{vars.name}}? This means plenty of opportunities to go skiing, hiking and climbing. (yes/no/idm)', [
        {
            pattern: 'yes',
            handler: async(response, convo, bot) => {
                MountainVector = 100;
                MountainWeight = 1;
                await bot.say('Mountain views are the best!');
                return await convo.gotoThread('Nightlife');
            }
        },
        {
            pattern: 'no',
            handler: async(response, convo, bot) => {
                MountainVector = 0;
                MountainWeight = 1;
                await bot.say('No problems!');
                return await convo.gotoThread('Nightlife');
            }
        },
        {
            pattern: 'idm',
            handler: async(response, convo, bot) => {
                MountainWeight = 0;
                await bot.say('Okay, thanks.')
                return await convo.gotoThread('Nightlife');
            }
        },
        {
            default: true,
            handler: async(response, convo, bot) => {
                await bot.say('I did not understand that. Please try again.');
                return await convo.repeat();
            }
        }
    ], 'mountainanswer', 'Mountain');
    // asking nightlife
    convo.addAction('Nightlife');
    convo.addMessage('Final question!', 'Nightlife');
    convo.addQuestion('Do you want to travel somewhere vibrant, with plenty of restaurants, bars and nightlife? (yes/no/idm)', [
        {
            pattern: 'yes',
            handler: async(response, convo, bot) => {
                NightlifeVector = 100;
                NightlifeWeight = 1;
                await bot.say('Make sure you wear something fancy!');
            }
        },
        {
            pattern: 'no',
            handler: async(response, convo, bot) => {
                NightlifeVector = 0;
                NightlifeWeight = 1;
                await bot.say('That\'s ok! Sometimes I just want to travel somewhere quiet.');
            }
        },
        {
            pattern: 'idm',
            handler: async(response, convo, bot) => {
                NightlifeWeight = 0;
                await bot.say('Thank you!');
            }
        },
        {
            default: true,
            handler: async(response, convo, bot) => {
                await bot.say('I did not understand that. Please try again.');
                return await convo.repeat();
            }
        }
    ], 'nightlifeanswer', 'Nightlife');
    
    controller.addDialog(convo);
    
    controller.afterDialog(convo, async(bot, results) => {
        await bot.say('Thank you! We are processing your result. Please wait...')
        // calculate score
        var i;

        for (i = 1; i < all_dest.length; i++) {
            score = 0;
            score = (Math.pow((Number(all_dest[i][5])-CostVector),2)) + (CultureWeight * Math.pow((Number(all_dest[i][6])-CultureVector),2)) + (WaterWeight * Math.pow((Number(all_dest[i][7])-WaterVector),2)) + (MountainWeight * Math.pow((Number(all_dest[i][8])-MountainVector),2)) + (NightlifeWeight * Math.pow((Number(all_dest[i][9])-NightlifeVector),2));
            if ((score < 1) == (score > 1)) {
                all_dest[i].push(9999999);
            } else {
                all_dest[i].push(score);
            }
        }
        
        score = 99999999;
        
        for (i = 1; i < all_dest.length; i++) {
            if (all_dest[i][10] < score) {
                score = all_dest[i][10];
                first_city = all_dest[i][2];
                first_country = all_dest[i][1];
            }
        }
        console.log(`${first_city}, ${first_country}`);
        score = 99999999;
        
        for (i = 1; i < all_dest.length; i++) {
            if (all_dest[i][10] < score && all_dest[i][2] !== first_city) {
                score = all_dest[i][10];
                second_city = all_dest[i][2];
                second_country = all_dest[i][1];
            }
        }
        console.log(`${second_city}, ${second_country}`);
        
        score = 99999999;
        for (i = 1; i < all_dest.length; i++) {
            if (all_dest[i][10] < score && all_dest[i][2] !== first_city && all_dest[i][2] !== second_city) {
                score = all_dest[i][10];
                third_city = all_dest[i][2];
                third_country = all_dest[i][1];
            }
        }


        await bot.say(`OK! My best recommendation for you is ${first_city} in ${first_country}. It just seems perfect for you!`);
        await bot.say(`My second recommendation for you is ${second_city} in ${second_country}. Have a look at that as well.`);
        await bot.say(`Finally, I recommend ${third_city} in ${third_country}.`);
        await bot.say('Thank you for using our service. Please visit AMEX Travel website or Lonely Planet for more information. Type \'begin\' to start a new query.');
    })


    controller.hears( 'begin', 'message,direct_message', async( bot, message ) => {
    await bot.beginDialog( 'recommender' );
    });
};