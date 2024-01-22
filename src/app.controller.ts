import {
  OnText,
  Controller,
  Text,
  Update,
  Message,
  IMessage,
  IUpdate,
  OnCommand,
  MyCommands,
  DeleteMyCommands,
  OnEntity,
  Entity,
  IEntity,
  Answer,
  GetAnswer,
  MessageSend,
  KeyboardTypes,
  Keyboard,
  OnClick,
  OnPost,
  GetAnswerContext,
} from 'nestgram';
import { AppService } from './app.service';

export const MenuKeyboard = new Keyboard(KeyboardTypes.underTheMessage)
  .btn('btn1', 'one') // you can create buttons
  .btn('btn2', 'two')
  .row() // you can also create rows
  .btn('Menu', 'menu'); // one button in the next row

@Controller()
export class AppController {
  @GetAnswerContext() answer: Answer;
  constructor(private readonly appService: AppService) {}

  @OnCommand('start')
  async start() {
    await this.answer.send('Hello, world!');
    await this.answer.send(
      new MessageSend('How are you?'),
      new Keyboard(KeyboardTypes.underTheMessage)
        .btn('Start!', 'start'),
    )
  }

  @OnClick('start')
  async startBtn(): Promise<MessageSend> {

    let keyboard=new Keyboard(KeyboardTypes.underTheChat);
    for(let i=0;i<10;i++){
      keyboard.text(`${i}`);
    }


    return new MessageSend(
      'underTheMessage (or inline_keyboard) keyboard example',
      keyboard
      // new Keyboard(KeyboardTypes.underTheChat) // keyboard type
      //   .text('Ok')
      //   .text('First button') // creates a button. 1st argument is text, 2nd argument is button id
      //   .text('Second button')
      //   .row() // creates a row with newly added buttons
      //   .text('Back') // for the last buttons row is created automatically
    );
  }

  @OnPost()
  async post(@Message() message: IMessage): Promise<any> {
    console.log(message);
  }

  @OnText("Ok")
  async getText(@Text() text: string){
    return new MessageSend(
      'underTheMessage (or inline_keyboard) keyboard example',
      new Keyboard(KeyboardTypes.underTheChat) // keyboard type
        .text('Ok')
        .row() // creates a row with newly added buttons
        .text('Back') // for the last buttons row is created automatically
    );
  }

  @OnText("Back")
  async getBack(@Text() text: string){
    return new MessageSend(
      'underTheMessage (or inline_keyboard) keyboard example',
      new Keyboard(KeyboardTypes.underTheChat) // keyboard type
        .text('Ok')
        .row() // creates a row with newly added buttons
        .text('Back') // for the last buttons row is created automatically
    );
  }

  @OnText()
  async onText(
    @Text() text: string,
    @Update() update: IUpdate,
    @Message() message: IMessage
  ): Promise<any> {
    console.log(update, message);
    return `I got your message! ${text}`;
  }
}
