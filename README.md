# AMEX2020
This repository is dedicated to the AMEX Challenge 2020. Created by Daniel, Amna, Andrada, Aleksandra.

We aim to create a automatic chatbot that asks several questions about the traveller's preference, using sentiment analysis to classify and return a list of recommended travel destinations.

The initial plan was to use Cisco's Webex Chatbot API, however due to lack of time and JavaScript knowledge (BotKit runs on js) we are unable to deliver this for the time being.

You can still run the ```run_prototype.py``` file to test the chatbot, note that you will need to change the directory of ```data.csv``` in line 143 accordingly. which will ask questions and recommend a destination in the Python console. Please note that you will need to install the ```monkeylearn``` and ```pandas``` packages.

our travel recommender bot processes 350+ travel destinations worldwide and recommends the best destination in terms of cost, culture and history, nature and entertainment, which are the common factors that travellers takes into account. To see how we processed the data, you may find the ```Travel Destinations Analysis.ipynb``` notebook useful. The ```PCA.py``` file visualises how similar each city is using principle component analysis.

If you wish to run the notebook, you will need to install the packages in the environment. Use ```pip install -r requiremets.txt``` in the terminal.
