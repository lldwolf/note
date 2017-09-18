unit AddTwoNumFrm;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  ModuleFrm, StdCtrls;

type
  TFrmAddTwoNum = class(TFrm)
    Label1: TLabel;
    Label2: TLabel;
    Edit1: TEdit;
    Edit2: TEdit;
    Label3: TLabel;
    Edit3: TEdit;
    Button1: TButton;
    Button2: TButton;
    procedure Button2Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmAddTwoNum: TFrmAddTwoNum;

implementation

uses InterfaceUnit;

{$R *.DFM}

procedure TFrmAddTwoNum.Button2Click(Sender: TObject);
begin
  Close;
end;

procedure TFrmAddTwoNum.Button1Click(Sender: TObject);
var
  i: Integer;
begin
  i := AddTwoNum(1,3);
  Edit3.Text := IntToStr(i);
end;

end.
