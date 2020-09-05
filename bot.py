from webexteamsbot import TeamsBot
from webexteamsbot.models import Response


# Retrieve required details from environment variables
bot_email = 'amex2020@webex.bot'
teams_token = 'MWFjZTcyZWQtOGE3ZS00NTAwLTlhY2ItYzk3OWZlZGQ4YzRjODE1N2I1ZDAtYmJh_PF84_consumer'
bot_url = 'https://0a63dc7d7be8.ngrok.io'
bot_app_name = 'LonelyPlanetChatBot'

# Create a Bot Object
bot = TeamsBot(
    bot_app_name,
    teams_bot_token=teams_token,
    teams_bot_url=bot_url,
    teams_bot_email=bot_email,
)


def begin():
    return "Ok. Let's start!"


# A simple command that returns a basic string that will be sent as a reply
def start(incoming_msg):
    comman



def greeting(incoming_msg):
    # Loopkup details about sender
    sender = bot.teams.people.get(incoming_msg.personId)

    # Create a Response object and craft a reply in Markdown.
    response = Response()
    response.markdown = "Hello {}, I'm a chat bot. ".format(sender.firstName)
    response.markdown += "See what I can do by asking for **/help**."
    return response


# Add new commands to the box.
bot.add_command('/start', 'start a travel query', start)
bot.add_command('/greeting', 'send a greeting', greeting)
bot.set_help_message("Welcome to Lonely Planet Chatbot! Start a travel query by typing '/start'. You can use the following commands:\n")


if __name__ == "__main__":
    # Run Bot
    bot.run(host="0.0.0.0", port=5000)