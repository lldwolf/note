unit MessageFrm;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  ModuleFrm, StdCtrls;

const
  SX_MYMESSAGE = WM_USER;
  MessString = '%s message now in %s';

type
  TFrmMessage = class(TFrm)
    GroupBox1: TGroupBox;
    GroupBox2: TGroupBox;
    CbMessage: TCheckBox;
    CbWndProc: TCheckBox;
    CbMessProc: TCheckBox;
    CbDefHand: TCheckBox;
    RbMessage: TRadioButton;
    RbWndProc: TRadioButton;
    RbMessProc: TRadioButton;
    RbDefHand: TRadioButton;
    CbEatMessage: TCheckBox;
    BtnPostMessage: TButton;
    BtnSendMessage: TButton;
    procedure FormCreate(Sender: TObject);
    procedure BtnPostMessageClick(Sender: TObject);
    procedure BtnSendMessageClick(Sender: TObject);
    procedure CbMessageClick(Sender: TObject);
    procedure CbEatMessageClick(Sender: TObject);
  private
    //用OnMessage事件处理消息
    procedure OnAppMessage(var Msg: TMsg; var Handled: Boolean);

    //用WndProc处理消息
    procedure WndProc(var Msg: TMessage); override;

    //用消息句柄处理消息
    procedure SXMyMessage(var Msg: TMessage); message SX_MYMESSAGE;

    //用DefaultHandler处理消息
    procedure DefaultHandler(var Msg); override;
  public
    { Public declarations }
  end;

var
  FrmMessage: TFrmMessage;

implementation

{$R *.DFM}

const
  SendPostString: array[0..1] of string = ('Sent', 'Posted');
{ TFrmMessage }

procedure TFrmMessage.DefaultHandler(var Msg);
var
  CallInherited: Boolean;
begin
  CallInherited := True;
  if TMessage(Msg).Msg = SX_MYMESSAGE then
  begin
    if CbDefHand.Checked then
    begin
      ShowMessage(Format(MessString, [SendPostString[TMessage(Msg).WParam], 'DefaultHandler']));
      //若不想吃掉消息调用inherited
      CallInherited := not RbDefHand.Checked;
    end;
  end;

  if CallInherited then inherited DefaultHandler(Msg);
end;

procedure TFrmMessage.OnAppMessage(var Msg: TMsg; var Handled: Boolean);
begin
  if Msg.message = SX_MYMESSAGE then
  begin
    if CbMessage.Checked then
    begin
      ShowMessage(Format(MessString, [SendPostString[Msg.WParam], 'Application.OnMessage']));
      Handled := RbMessage.Checked;
    end;
  end;
end;

procedure TFrmMessage.SXMyMessage(var Msg: TMessage);
var
  CallInherited: Boolean;
begin
  CallInherited := True;
  if Msg.Msg = SX_MYMESSAGE then
  begin
    if CbMessProc.Checked then
    begin
      ShowMessage(Format(MessString, [SendPostString[Msg.WParam], 'Message Procedure']));
      //若不想吃掉消息调用inherited
      CallInherited := not RbMessProc.Checked;
    end;
  end;

  if CallInherited then inherited;
end;

procedure TFrmMessage.WndProc(var Msg: TMessage);
var
  CallInherited: Boolean;
begin
  CallInherited := True;
  if Msg.Msg = SX_MYMESSAGE then
  begin
    if CbWndProc.Checked then
    begin
      ShowMessage(Format(MessString, [SendPostString[Msg.WParam], 'WndProc']));
      //若不想吃掉消息调用inherited
      CallInherited := not RbWndProc.Checked;
    end;
  end;

  if CallInherited then inherited WndProc(Msg);
end;

procedure TFrmMessage.FormCreate(Sender: TObject);
begin
  inherited;
  Application.OnMessage := OnAppMessage;

  CbMessage.Tag := Longint(RbMessage);
  CbWndProc.Tag := Longint(RbWndProc);
  CbMessProc.Tag := Longint(RbMessProc);
  CbDefHand.Tag := Longint(RbDefHand);
  RbMessage.Tag := Longint(CbMessage);
  RbWndProc.Tag := Longint(CbWndProc);
  RbMessProc.Tag := Longint(CbMessProc);
  RbDefHand.Tag := Longint(CbDefHand);
end;

procedure TFrmMessage.BtnPostMessageClick(Sender: TObject);
begin
  PostMessage(Handle, SX_MYMESSAGE, 1, 0);
end;

procedure TFrmMessage.BtnSendMessageClick(Sender: TObject);
begin
  SendMessage(Handle, SX_MYMESSAGE, 0, 0);
end;

procedure TFrmMessage.CbMessageClick(Sender: TObject);
begin
  if CbEatMessage.Checked then
  begin
    with TRadioButton((Sender as TCheckBox).Tag) do
    begin
      Enabled := TCheckBox(Sender).Checked;
      if not Enabled then Checked := False;
    end;
  end;
end;

procedure TFrmMessage.CbEatMessageClick(Sender: TObject);
var
  i: Integer;
  DoEnable, EatEnabled: Boolean;
begin
  EatEnabled := CbEatMessage.Checked;
  for i := 0 to GroupBox2.ControlCount - 1 do
  begin
    with GroupBox2.Controls[i] as TRadioButton do
    begin
      DoEnable := EatEnabled;
      if DoEnable then DoEnable := TCheckBox(Tag).Checked;
      if not DoEnable then Checked := False;
      Enabled := DoEnable;
    end;
  end;
end;

end.
