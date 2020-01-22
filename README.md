# Face Control

Проект **"Face control"** выполнен студентами группы _18МАГ ИАД_ в рамках курса "Проекты ИАД", магистерская программа "Интеллектуальный анализ данных", Факультет Информатики, Математики и Компьютерных наук, Высшая школа экономики. &copy;2020

### **Состав участников:**
* _Масленникова Елизавета_
* _Канатов Николай_
* _Горская Ксения_
* _Корнева Татьяна_
* _Коробков Никита_
* _Кузнецова Екатерина_

#### Преподаватель: 

**Михаил Владимирович Бацын**, 

_кандидат физико-математических наук, доцент кафедры прикладной математики и информатики, ведущий научный сотрудник Лаборатории Алгоритмов и Технологий Анализа Сетевых Структур_

# Описание проекта

Текущие способы контроля сотрудников на большом предприятии имеют несколько недостатков: 
* Бумажный документооборот;
* «Тяжелое» обновление известной базы данных;
* Сложности с привлечением новых сотрудников;
* Большие временные затраты;
* Слабый контроль сторонних работников (outsourcing)
 
**Цель нашего проекта:** создание масштабируемого решения контроля доступов сотрудника на промышленных предприятиях с гибким интерфейсом для работы с базой данных. 

В результаты работы нашей команды мы планируем создать **Web-приложение** с простым масштабируемым интерфейсом для легкого обновления базы сотрудников **с возможностью детектирования и идентификации сотрудников по изображению лица** при помощи специальной системы видеонаблюдения.

**Камеры**, находящиеся на территории всего предприятия **в режиме онлайн идентифицируют и отслеживают всех людей в конкретной зоне**. Планируется, что если система заметит посторонних или сотрудников без доступа к данной территории, или вообще не сможет идентифицировать лицо – **автоматически поднимается тревога на пульт охраны**.
Дополнительно система ведет статистику и записывает перемещения всех сотрудников для облегчения процесса мониторинга. 
Также **web-приложение** позволяет быстро и легко добавлять новых или же заводить сторонних сотрудников в систему.


### Распределение работы внутри команды:
* Масленникова Елизавета – ответственная за **систему идентифицирования сотрудников** на видео-трансляции в режиме онлайн; разработка, ревью кода и поддержка части проекта на **Python**.

* Коробков Никита – разработка **системы идентифицирования сотрудников**; разработка, ревью кода и поддержка части проекта на **Python**; помощь в разработке **backend-а для web-приложения**.

* Корнева Татьяна - разработка, ревью кода и поддержка части проекта на **Python**; помощь в разработке **дизайна для frontend-а**; ответственная за **еженедельные отчеты**.

* Канатов Николай – ответственный за **web-приложение**; разработка, ревью кода и поддержка **web-интерфейса приложения**.

* Горская Ксения - разработка, ревью кода и поддержка **web-интерфейса приложения**; разработка **дизайна для frontend-а**.

* Кузнецова Екатерина - разработка, ревью кода и поддержка **web-интерфейса приложения**; ответственная за **структуру и наполнение БД сотрудников**.


### План работы

| **Дата** | | | | |
|:-------------:|:------------------:|:-----:|:-----:|:-----:|
| _22.01.2020_ | Выбор проекта | Краткое описание проекта | Определение цели и задач | Создание общего репозитория |
| _29.01.2020_ | Определение стека технологий | Исследование и выбор технологии детектирования лиц | Выбор подходящего проекта для backend части |  |
| _5.02.2020; 12.02.2020_ | **Python:** реализация детектирования лица и корпуса человека онлайн по видеостриму и слежение за ним | **Backend:** создание api проекта, настройка инфраструктуры проекта | **Frontend:** создание начального проекта, настройка взаимодействия с сервером | **БД:** Определение схемы используемой базы данных, заполнение тестовыми данными |
| _19.02.2020; 26.02.2020; 04.03.2020_ | **Python:** добавление персонализации человека по базе, создание интерфейса по добавлению, изменению и удалению человека для детектирования | **Backend:** основная разработка | **Frontend:** основная разработка | |
| _11.03.2020_ | **Python:** добавление логирования при детектировании, передача сигналов на бэкенд | Соединение и подключение всех частей проекта | | |
| _18.03.2020_ | Тестирование проекта | Косметические улучшения | | |
| _25.03.2020_ | Итоговая демонстрация готового продукта | | | |


### Недельный отчет 

В течение 1-ой недели работы наша команда: 
* определилась с итоговым проектом, сформулировала основные цели и задачи работы, обосновали актуальность и необходимость проекта; 
* определила основные части итогового проекта; 
* распределила «зоны ответственности» между участниками;
* составила первоначальный план работы над проектом; 
* подготовила необходимую инфраструктуру – создали общий репозиторий с доступом всех участников команды, выложили всю необходимую информацию по проекту, договорились о правилах разработки, коммитах и ревью кода


