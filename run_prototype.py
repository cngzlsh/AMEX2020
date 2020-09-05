from monkeylearn import MonkeyLearn


question_count = 0
ask_question = True
while ask_question:
    ml = MonkeyLearn('19fdbedb5ff6a2fc30e37a96bf93cbf973305c6e')
    model_id = 'cl_pi3C7JiL'

    while question_count == 0:
        print('Hello! Welcome to Lonely Planet Chatbot.')
        print('We are here to find the best travel destination for you.')
        question_count += 1

    while question_count == 1:
        print('\n')
        data = input("Let's start. First of all, are you looking for a luxurious holiday?\n")
        if data.lower() in ['yes', 'sure', 'of course']:
            analysis = 'Positive'
        else:
            analysis = ml.classifiers.classify(model_id, [data])
            analysis = analysis.body[0]['classifications'][0]['tag_name']

        if analysis == 'Positive':
            exp_cost = 100
            question_count += 1
        elif analysis == 'Negative':
            exp_cost = 0
            question_count += 1
        else:
            print("I am not sure I understand that. Please try again.")

    while question_count == 2:
        print('\n')
        if analysis == 'Positive':
            print('Great! Ready to splash some cash!')
        elif analysis == 'Negative':
            print("Who doesn't want to travel on a budget?")

        data = input("Now, in a few words, tell me about your thoughts on cultural heritage and history. \nYou can say things like: 'I absolutely love it!', 'Not really my thing' or 'I am neutral about it.\n")
        if data.lower() in ['yes', 'sure', 'of course']:
            analysis = 'Positive'
        else:
            analysis = ml.classifiers.classify(model_id, [data])
            analysis = analysis.body[0]['classifications'][0]['tag_name']

        if analysis== 'Positive':
            exp_culture = 100
            exp_culture_weight = 1
            question_count += 1
        elif analysis == 'Negative':
            exp_culture = 0
            exp_culture_weight = 1
            question_count += 1
        else:
            exp_culture = 0
            exp_culture_weight = 0
            question_count += 1

    while question_count == 3:
        print('\n')

        if analysis == 'Positive':
            print('Yes, I love history and culture as well.')
        elif analysis == 'Negative':
            print("No? Let's talk about nature.")

        data = input('Do you enjoy travelling somewhere near the water, like seaside or lake side?\n')
        if data.lower() in ['yes', 'sure', 'of course']:
            analysis = 'Positive'
        else:
            analysis = ml.classifiers.classify(model_id, [data])
            analysis = analysis.body[0]['classifications'][0]['tag_name']

        if analysis == 'Positive':
            exp_water = 100
            exp_water_weight = 1
            question_count += 1
        elif analysis == 'Negative':
            exp_water = 0
            exp_water_weight = 1
            question_count += 1
        else:
            exp_water = 0
            exp_water_weight = 0
            question_count += 1

    while question_count == 4:
        print('\n')
        data = input('Thanks. What about mountains? Great place for hiking, skiing, etc.\n')

        if data.lower() in ['yes', 'sure', 'of course']:
            analysis = 'Positive'
        else:
            analysis = ml.classifiers.classify(model_id, [data])
            analysis = analysis.body[0]['classifications'][0]['tag_name']

        if analysis == 'Positive':
            exp_mountain = 100
            exp_mountain_weight = 1
            question_count += 1
        elif analysis == 'Negative':
            exp_mountain = 0
            exp_mountain_weight = 1
            question_count += 1
        else:
            exp_mountain = 0
            exp_mountain_weight = 0
            question_count += 1

    while question_count == 5:
        print('\n')
        if analysis == 'Positive':
            print('Mountains are brilliant!')
        elif analysis == 'Negative':
            print('That is absolutely fine.')
        data = input('Final question: do you like somewhere vibrant, with plenty of bars, clubs and nightlife?\n')
        if data.lower() in ['yes', 'sure', 'of course']:
            analysis = 'Positive'
        else:
            analysis = ml.classifiers.classify(model_id, [data])
            analysis = analysis.body[0]['classifications'][0]['tag_name']
        if analysis == 'Positive':
            exp_nightlife = 100
            exp_nightlife_weight = 1
            question_count += 1
            ask_question = False
        elif analysis =='Negative':
            exp_nightlife = 0
            exp_nightlife_weight = 1
            question_count += 1
            ask_question = False
        else:
            exp_nightlife = 0
            exp_nightlife_weight = 0
            question_count += 1

print('\n')
print('Thank you. We are calculating your result...')

import pandas as pd

dest_df = pd.read_csv('/home/sihao/Documents/AMEX Challenge/data.csv')
dest_df.drop(columns='Unnamed: 0', inplace=True)
data = dest_df.values.tolist()

final_score = []
for dest in data:
    score = (exp_cost - dest[3])**2 + exp_culture_weight * (exp_culture-dest[4])**2 + exp_water_weight * (exp_water - dest[5]) ** 2 + exp_mountain_weight * (exp_mountain - dest[6]) ** 2 + exp_nightlife_weight * (exp_nightlife - dest[7]) ** 2
    final_score.append(score)
dest_df['Final_score'] = final_score
dest_df.sort_values(by='Final_score', ascending=True, inplace=True)
print('\n')
countries = dest_df['Country'].to_list()
cities = dest_df['City'].to_list()

print(f'OK! Based on your information, I highly recommand {cities[0]} in {countries[0]}. It is the perfect place for you!')