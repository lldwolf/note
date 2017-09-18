unit ModuleFrm;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls;

type
  TFrmModule = class(TForm)
    Label1: TLabel;
    Button1: TButton;
  private
    { Private declarations }
  public
    { Public declarations }
  end;

{��������}
procedure ShowModuleForm(AHandle: THandle); stdcall;

var
  FrmModule: TFrmModule;

implementation

{$R *.DFM}

procedure ShowModuleForm(AHandle: THandle); 
begin
  Application.Handle := AHandle;
  FrmModule := TFrmModule.Create(Application);
  try
    FrmModule.ShowModal;
  finally
    FrmModule.Free;
  end;
end;

end.
