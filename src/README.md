# Simple Chat Application

## Overview

This document provide an overview of this application, including the component funtionality, api's that used to fetch a messages in chunk and how user able to see the messages of other chat room using using the shared link.

## Key Components

- ChatHome
- ChatRoom
- ChatMessages
- MessageInput

## ChatHome

**Overview:**

- This compoenent is like home page and entry point of application.
- Display the list of chat rooms.
- Allows users to navigate to individual chat rooms.

**Functionality:**

- Fetches the list of chat rooms from the backend API.
- Handles loading and error states during fetching .

**API Used:**

- `GET /api/rooms?userId={userId}` to fetch the list of chat rooms.

## ChatRoom

**Overview:**

- Handles most of the api for fetching chunk of messages, adding and check for a new messages in regular interval of time.
- Handles the every messages that user requested or added or recieved from other user, for a specific chat room.
- Hold ChatMessages and MessageInput Component and passes the respective props.

**Functionality:**

- Fetches messages for a specific chat room from the backend API using page and messageId params.
- Page is to keep track of how times we called the API to fecth messages. This can be used for backend what sect of messages we are expecting
- MessageId is only come to picture when user visited the chat through to link. We passed this to backend to tell we are expecting the chunk of messages nearest to that link message. If we don't find messageId in params we simply send it as 0 to tell backend we are not expecting any particular message.
- Fetches the new messages that user recieved from other user by calling the API of setInterval, Assuume 1 sec or 5 sec.
- When new messages added by us, it calls add message api to store it to database.

**API Used:**

- `GET /api/messages?roomId={roomId}&page={page}&messageId={messageId}&userId={userId}` to fetch messages for a specific room.
- `GET /api/newMessage?roomId={roomId}` to fetch new message from other user
- `POST /api/addMessage` to add the new messsage to database.

### ChatMessages

**Overview:**

- Display the all messages and its scrollable vertically.
- Handles scrolling to load older messages.
- Handles best UX without scrolling top or bottom when new chunk get added.

**Functionality:**

- Listens to scroll events to detect when the user reaches the top of the chat window.
- Loads older messages by triggering the fetch action by calling the loadOlderMessages func .
- Maintains the scroll position when new messages are loaded using ref.

### MessageInput

**Overview:**

- Provides an input field for users to type and send new messages.

**Functionality:**

- Captures the user input.
- Sends the new message when the form is submitted.
- Adds the new message to the message list in the chat room.
