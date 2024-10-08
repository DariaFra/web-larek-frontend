# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/commons/blocks - папка со стилями
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/common - папка с кодом формы и модального окна

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура проекта
В разработке архитектуры проекта использован шаблон 
MVP:

- **Слой отображения (View)**— отвечает за отображение данных и вывод информации пользователю 

- **Слой данных (Model)** — отвечает за хранение данных

- **Бизнес-логика(Presenter)** - отвечает за связь отображения и данных

### Базовый код:
---

**Класс `Api`** - класс содержит логику отправки запросов на сервер. 

**Методы:**
| | |
| --- | --- |
|get |метод выполянет GET запрос на сервер и возвращает объект с данными|
|post |принимает объект с данными и отправляет их на сервер|

---

**Класс `EventEmitter`** - класс брокер для работы с событиями, позволяет подписываться на события и уведомлять подписчиков о наступлении события. 

**Методы:**
| | |
| --- | --- |
|On | метод подписки на события|
|Off | метод отписки от события|
|Emit |  метод уведомления о наступлении события|
|onAll | метод подписки на все события|
|onOff | метод сброса всех подписчиков| 
|Trigger | метод создает заданное событие с заданными агрументами, что позволяет передавать его в качестве обработчика события в другие классы.| 

  ---
  
 
**Абстрактный класс `Component`** - класс-основа для всех элементов представления используемых в проекте. В конструктор передается DOM-элемент,  который будет контейнером для потомков класса. 

**Методы:** 
| | |
| --- | --- |
|setText|метод устанавливает текстовое содержимое|
|setDisable|метод установливаает / снимает статус блокировки|
|setHiden| метод скрывает элемент|
|setVisible| метод показывает элемент |
|setImage|метод устанавливает изображение|
|render |метод возвращает элемент разметки с контентом для отображения на странице|
- - -

**Абстрактный класс `Model`** - класс модели данных

**Метод:** 
| | |
| --- | --- |
|emitChanges | метод создает уникальное событие|
---


### Компонент модели данных: 
**Класс `AppState`** - класс хранит данные о каталоге товаров и заказе пользователя, а также логика работы с данными.

**Методы:** 
| | |
| --- | --- |
|setCatalog |метод добовляет объекты карточек товара в каталог и добовляет событие изменения массива товаров|
|setPreview| метод добовляет `id` выбранного товара в  `preview` и добовляет событие изменения выбранной карточки|
|setOrderField | метод заполняет поля объекта order данными введенными клиентом и запускает проверку введенных данных. В случае успешной проверки добавляет событие готовности товара `order: ready`|
|validateOrder |метод проверки данных введенных клиентом. В случае ошибки добавляет событие `formError: change`|
|getOrderItem |метод возвращвает массив товаров добавленных в корзину|
|getTotal|метод вычисляет сумму товаров добавленых в карзину|
|addItemsToBasket |метод добавляет выбранный товар по `id` в массив `items` объекта order и добавляет событие изменения корзины `basket: changed`|
|deleteItemsFromBasket|метод удаляет товар по `id` из масива `item` в объекте `order` и добовляет событие изменения корзины `basket: changed`|
|clearBasket | очищает объект `order`|
- - -

### Компоненты отображения 
**Класс `Basket`** - класс реализует отображение корзины.  

**Поля класса:** 

```
_submit: HTMLButtonElement - кнопка отправки формы

_errors: HTMLElement - элемент отображения ошибок
```
**Методы:** 
| | |
| --- | --- |
|onInputChange |метод изменения данных в полях формы и добовляет событие `${this.container.name}.${String(field)}: change` |
|render| метод возвращает элемент формы для отображения на странице|
---



**Класс `Modal`** - класс реализует модальные окна.

**Поля класса:**
```
_closeButton: HTMLButtonElement - кнопка закрытия модального окна

_content: HTMLElement-  контент модального окна
```

**Методы:**
| | |
| --- | --- |
|open | метод откырытия модального окна|
|close | метод закрытия модального окна|
|rander | метод отображения модального окна на странице|

---

**Класс `Success`** - класс реализует окно успешного заказа

**Поля класса:**
```
_close: HTMLButtonElement - кнопка «За новыми покупками!»

_total: HTMLElement - элемент суммы списания
```
---

**Класс `Card`** - класс реализует отображение карточки товара на главной странице.

**Поля класса:**

```
_title: HTMLElement - элемент для отображения названия товара

_image?: HTMLImageElement- элемент изображения товара

_category?: HTMLElement - элемент для отображения категории товара

_price: HTMLElement - элемент для отображения цены товара
```

---

**Класс `CardPreview`** - класс реализует отображение выбранной карточки товара

**Поля класса:**

```
_description: HTMLElement - элемент для отображения описания выбранного товара

_button: HTMLButtonElement -кнопка добавления товара в корзину
```

---

**Класс `CardBasket`** - класс реализует отображение товаров в корзине

**Поля класса:**
```
_title: HTMLElement -элемент для отображения названия товара

_price: HTMLElement -элемент для отображения цены товара

_button: HTMLButtonElement - кнопка удаления товара из корзину

_index: HTMLElement -элемент порядкого номера в корзине
```

---

**Класс `ClientContacts`** - класс реализует отображение формы с email и телефона клиента

---

**Класс `Page`** - класс реализует отображение главной страницы

**Поля класса:**
```
_counter: HTMLElement - элемент для отображения количества товаров в корзине

_catalog: HTMLElement - элемент отображения каталога товаров

_wrapper: HTMLElement - элемент-обертка основного конвента страницы

_basket: HTMLElement - элемент корзины на странице
```

---

**Класс `StoreApi`** - класс реализует взаимодействие с сервером

**Методы:**
| | |
| --- | --- |
|getProductItem | метод получения товара по `id`|
|getProductList | метод получения каталога товаров|
|orderItem | метод отправки информации об оформленном заказе на сервер|
---

### Взаимодействия компонентов

В файле `index.ts` содержится код:

- создание экземпляров классов.
- взаимодействие данных и отображения между собой
- взаимодействие с помощью событий, создаваемых с помощью брокера и  их обработка

---

**События изменения данных:**
| | |
| --- | --- |
|items: changed|изменение каталога товаров|
| preview: changed | изменение выбранной карточки товара|
|basket: changed |изменение состояния корзины|
|order: ready|данные в полях формы прошли вариацию|
|formError: change|изменение при ошибки в валидации формы|

---

**События возникающие при взаимодействии клиента с приложением:**
|||
| --- | --- |
|card: selected |клик по карточке товара в каталоге|
|modal: open|открытие модального окна|
|modal: close|закрытие модального окна|
|basket: open|открытие корзины|
|order: open| открытие формы адреса доставки|
|clientContacts: open|открытие формы с контактами клиента|
|order: submit|отправка формы|
|clientContacts: submit |оформление заказа|

---
