# Simple Chat Application

## Overview

This document provide an overview of this application, including the component funtionality, api's that used to fetch a messages in chunk and how user able to see the messages of other chat room using using the forwarded message link.

## Key Components

- LoginForm/SignupForm
- ChatHome
- ChatRoom
- ChatMessages
- ContextMenu
- ForwardModal
- MessageInput

## LoginForm

**Overview:**

- Handles login and creating the new account.

**Functionality:**

- Captures the user input of user name and password.
- Allow the user to create the new account by providing CTA switch the content.
- Validating form to make sure user enter the all detail in required field.
- Submiting form will send the detail to the api.

**Pseudocodes**

    function toggleForm():
       isLogin = !isLogin

    if isLogin:
       render LoginForm
    else:
       render SignupForm


**API Used:**

- `POST /api/sigup` to create a new account.
- `POST /api/login` to login.

## ChatHome

**Overview:**

- This compoenent is like home page and entry point of application.
- Display the list of chat rooms.
- Allows users to navigate to individual chatrooms.

**Functionality:**

- Fetches the list of chat rooms from the backend API using the userId.
- Handles loading and error states during fetching .

**API Used:**

- `GET /api/rooms?userId={userId}` to fetch the list of chat rooms.

## ChatRoom

**Overview:**

- Handles most of the api for fetching chunk of messages, adding and check for a new messages in regular interval of time.
- Handles the every messages that user fetched or recieved from other user, for a specific chat room.
- Hold ChatMessages and MessageInput Component and passes the respective props.

**Functionality:**

- Fetches messages for a specific chat room from the backend API using page and messageId params.
- Page is to keep track of how times we called the API to fecth messages. This can be used for backend what chunk of messages we are expecting
- MessageId is only come into the picture when user visited the chat through the forwarded link. We passed this to backend to tell we are expecting the chunk of messages nearest to that link message. If we don't find messageId in params we simply send it as 0 to tell backend we are not expecting any particular message.
- Fetches the new messages that user recieved from other user by calling the API of setInterval time, Assuume 1 sec, Using the response we can add the newly recieved message or show the user on other end is typing or not.
- When new messages added by us, it calls add message api to store it to database.

**Pseudocodes**

    state roomId = 1
    function loadMessages():
        if messageId:
            dispatch(fetchMessages(roomId, messageId))
        else:
            dispatch(fetchMessages(roomId, 0))

    // plain text
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(fetchNewMessages(roomId));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch, roomId]);

**API Used:**

- `GET /api/messages?roomId={roomId}&page={page}&messageId={messageId}&userId={userId}` to fetch messages for a specific room.
- `GET /api/newMessage?roomId={roomId}` to fetch new message from other user, it will also have whether user on other end is typing.
- `POST /api/addMessage` to add the new messsage to database.

### ChatMessages

**Overview:**

- Display the all messages and its scrollable vertically.
- Handles scrolling to load older messages.
- Handles best UX without scrolling top or bottom when new chunk get added.
- Messages are set left or right based on user.

**Functionality:**

- Listens to scroll events to detect when the user reaches the top or bottom of the chat window.
- Loads the next chunk of messages by triggering the fetch action when user reaches the top or bottom by adding scroll event listners and using Ref.
- Maintains the scroll position when new messages are loaded using Ref scrollTop for better UX.
- If old message or lastest message is fetched then retricting the fetching action accordingly.
- Based on users we can plcae the text in left or right using text-allign.
- When user double click the text using onContextMenu event it will show the forward option that in ContextMenu component.

**Pseudocodes**

    // To Fetch next chunk when scroll below or top:
    function addScrollEventListener():
        chatMessage.addEventListener('scroll', handleScroll)

    function handleScroll():
        if chatMessage.scrollTop == 0 && isLastMessageLoaded:
            loadOlderMessages()
        else if chatMessage.scrollTop == ref.current.scrollHeight && isNewMessageLoaded:
            loadlatestMessages()

    // To show last conversatiion first when component mount:
    function componentDidMount():
    if messageId is provided:
        loadMessagesUntil(messageId)
    else:
        chatMessage.scrollTop = chatMessage.scrollHeight


### ContextMenu

**Overview:**

- Messages are forwardable to other chat rooms.

**Functionality:**

- When user clicks the forward button we can open the new modal that has list of rooms, when user select any of the room, we can send this messages to backend..
- Allow the user to close this component using close button.

**API Used:**

- `POST /api/addMessage` to add the new messsage to database.

### ForwardModel

**Overview:**

- Shows the list of chat room in modal, so that user forward the copied message to any chatrooms.

**Functionality:**

- Using react-modal we can open this Modal compoenent
- When user click any of the room its send the message to the backend by calling an API
- Once message is sent successfully we can redirect to that room using useHistory hook.
- Close button to close this modal and cancelling forwarding the text.

### MessageInput

**Overview:**

- Provides an input field for users to type and send new messages.
- Allow the users on other end know whether I am typing or not.

**Functionality:**

- Captures the user input.
- Trigger the api when user start typing in input field using onChange event.
- Sends the new message when the form is submitted.
- Adds the new message to the message list in the chat room.

**Pseudocodes**

    Input field onChange event:
    Call handleTyping

    Function handleTyping():
        sendTypingStatusToBackend(true)

        setTimeout() //1 or 2 sec
            sendTypingStatusToBackend(false)

**API Used:**

- `POST /api/addMessage/typing` to let other user I sarted typing.
