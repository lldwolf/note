program ProgSum;

uses
  Forms,
  MainFrm in 'MainFrm.pas' {FrmMain},
  ModuleFrm in 'ModuleFrm.pas' {Frm},
  MessageFrm in 'MessageFrm.pas' {FrmMessage},
  AddTwoNumFrm in 'AddTwoNumFrm.pas' {FrmAddTwoNum},
  InterfaceUnit in 'Dll\InterfaceUnit.pas';

{$R *.RES}

begin
  Application.Initialize;
  Application.CreateForm(TFrmMain, FrmMain);
  Application.CreateForm(TFrm, Frm);
  Application.CreateForm(TFrmMessage, FrmMessage);
  Application.CreateForm(TFrmAddTwoNum, FrmAddTwoNum);
  Application.Run;
end.
