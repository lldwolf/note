unit MainFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Menus;

type
  TForm1 = class(TForm)
    MainMenu1: TMainMenu;
    N1ObjectPascal1: TMenuItem;
    N1111: TMenuItem;
    N31: TMenuItem;
    N3211: TMenuItem;
    N331: TMenuItem;
    N341: TMenuItem;
    N35TReaderTWriter1: TMenuItem;
    N41: TMenuItem;
    N42RTTI1: TMenuItem;
    N43RTTI1: TMenuItem;
    N44RTTI1: TMenuItem;
    N451: TMenuItem;
    N461: TMenuItem;
    N471: TMenuItem;
    procedure N1111Click(Sender: TObject);
    procedure N3211Click(Sender: TObject);
    procedure N331Click(Sender: TObject);
    procedure N341Click(Sender: TObject);
    procedure N35TReaderTWriter1Click(Sender: TObject);
    procedure N42RTTI1Click(Sender: TObject);
    procedure N43RTTI1Click(Sender: TObject);
    procedure N44RTTI1Click(Sender: TObject);
    procedure N451Click(Sender: TObject);
    procedure N461Click(Sender: TObject);
    procedure N471Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

uses StringRefFrm, ModuleFrm, MemoStrFrm, MemoryStreamFrm, CustomStreamFrm,
  ReadWriteFrm, OrdTypeFrm, MethodPointerRTTIFrm, ClassRTTIFrm,
  GetStringPropFrm, EnumRTTIFrm, SetTitleFrm;

{$R *.dfm}

procedure TForm1.N1111Click(Sender: TObject);
begin
  FrmStringRef.ShowModal;
end;

procedure TForm1.N3211Click(Sender: TObject);
begin
  FrmMemoStr.ShowModal;
end;

procedure TForm1.N331Click(Sender: TObject);
begin
  FrmMemoryStream.ShowModal;
end;

procedure TForm1.N341Click(Sender: TObject);
begin
  FrmCustomStream.ShowModal;
end;

procedure TForm1.N35TReaderTWriter1Click(Sender: TObject);
begin
  FrmReadWrite.ShowModal;
end;

procedure TForm1.N42RTTI1Click(Sender: TObject);
begin
  FrmOrdType.ShowModal;
end;

procedure TForm1.N43RTTI1Click(Sender: TObject);
begin
  FrmMethodPointerRTTI.ShowModal;
end;

procedure TForm1.N44RTTI1Click(Sender: TObject);
begin
  FrmClassRTTI.ShowModal;
end;

procedure TForm1.N451Click(Sender: TObject);
begin
  FrmGetStringProp.ShowModal;
end;

procedure TForm1.N461Click(Sender: TObject);
begin
  FrmEnumRTTI.ShowModal;
end;

procedure TForm1.N471Click(Sender: TObject);
begin
  FrmSetTitle.ShowModal;
end;

end.
