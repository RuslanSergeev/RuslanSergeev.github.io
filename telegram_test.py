import requests

def telegram_bot_sendtext(bot_message):
    
    bot_token = '1181855620:AAH18_Gz2TdXA09NkO_hTFzyTMMeGRqHQuI'
    bot_chatID = '-340902779'
    send_text = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + bot_message

    response = requests.get(send_text)

    return response.json()

test = telegram_bot_sendtext("Я по русски тоже могу, кстати. )")
#print(test)
