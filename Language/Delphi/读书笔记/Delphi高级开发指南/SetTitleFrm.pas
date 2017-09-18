unit SetTitleFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls, TypInfo;

type
  TFrmSetTitle = class(TFrm)
    CheckBox1: TCheckBox;
    Button1: TButton;
    Label1: TLabel;
    Edit1: TEdit;
    GroupBox1: TGroupBox;
    RadioButton1: TRadioButton;
    RadioButton2: TRadioButton;
    procedure AnyClick1(Sender: TObject);
    procedure AnyClick2(Sender: TObject);
  private
  public
    { Public declarations }
  end;

var
  FrmSetTitle: TFrmSetTitle;

implementation

{$R *.dfm}

{ TFrmSetTitle }

procedure TFrmSetTitle.AnyClick1(Sender: TObject);
var
  pcCapt: array[0..100] of Char;
begin
  (Sender as TControl).GetTextBuf(pcCapt, sizeof(pcCapt));
  StrCat(pcCapt, '*');
  (Sender as TControl).SetTextBuf(pcCapt);
end;

procedure TFrmSetTitle.AnyClick2(Sender: TObject);
var
  PropInfo: PPropInfo;
  Capt: string;
begin
  PropInfo := GetPropInfo(Sender.ClassInfo, 'Caption');
  if PropInfo = nil then
    PropInfo := GetPropInfo(Sender.ClassInfo, 'Text');
  if PropInfo <> nil then
  begin
    Capt := GetStrProp(Sender, PropInfo);
    Capt := Capt + '*';
    SetStrProp(Sender, PropInfo, Capt);
  end;
end;

end.
