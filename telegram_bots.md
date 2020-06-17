# Добавление телеграм-интерфейсов в скрипты

![Telegram_bots](assets/bot_father.jpg)

## Создание бота
Создание ботов происходит в боте [@BotFather](https://t.me/botfather).
Необходимо отправить команду `/newbot`.

## Настройка бота
Настройка ботов производится в чате с ботом [@BotFather](https://t.me/botfather).
Удобное управление ботами, их настройка и получение токенов созданных ботов
доступно по команде `/mybots`.


## Получение id-чатов и групп в которых состоит бот.
1. Нужно добавить бота в группу или чат.
2. Написать боту сообщение.
3. Перейти на страницу [https://api.telegram.org/bot<BOT_TOKEN>/getUpdates]()
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
    '/sendMessage?chat_id=' + bot_chatID + $

    response = requests.get(send_text)

    return response.json()

test = telegram_bot_sendtext("Я по русски тоже могу, кстати. )")
print(test)
```
