# Добавление телеграм-интерфейсов в скрипты

![Telegram_bots](assets/bot_father.jpg)
[Исходная статья](https://medium.com/@ManHay_Hong/how-to-create-a-telegram-bot-and-send-messages-with-python-4cf314d9fa3e)

## Создание бота  
Создание ботов происходит в боте [@BotFather](https://t.me/botfather).
Необходимо отправить команду `/newbot`.

## Настройка бота  

Настройка ботов производится в чате с ботом [@BotFather](https://t.me/botfather).
Удобное управление ботами, их настройка и получение токенов созданных ботов
доступно по команде `/mybots`.

## Про токены и chat_id:  

- `token` уникален для бота и выдаётся при его создании.
- `chat_id` - идентификатор чата, в который вы хотите чтобы бот отправлял данные.

Для этого бот должен состоять в чате / группе.
Получение `token` описано выше.
Получение `chat_id` описано ниже.

## Получение id-чатов и групп в которых состоит бот.
1. Нужно добавить бота в группу или чат.
2. Написать боту сообщение.
3. Перейти на страницу `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`
4. Отыскать своё сообщение (по содержимому или имени пользователя/группы откуда
  это сообщение было отправлено)
5. Скопировать поле `'chat': {'id': ... <-id goes there}`


## Отправка сообщений боту
Отправка сообщений в чат с заданным `bot_chatID` из бота с токеном `bot_token`
осуществляется вот таким скриптом

```python
import requests
def telegram_bot_sendtext(bot_message):

    bot_token = 'XXX'
    bot_chatID = 'YYY'
    send_text = 'https://api.telegram.org/bot' + bot_token + \
    '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + bot_message

    response = requests.get(send_text)

    return response.json()

test = telegram_bot_sendtext("Я по русски тоже могу, кстати. )")
print(test)
```
