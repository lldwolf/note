unit MemoryStreamFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls;

type
  TFrmMemoryStream = class(TFrm)
    OpenDialog1: TOpenDialog;
    SaveDialog1: TSaveDialog;
    GroupBox1: TGroupBox;
    Memo1: TMemo;
    Button1: TButton;
    Button2: TButton;
    Button3: TButton;
    Button4: TButton;
    ListBox1: TListBox;
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
  private
    MemStr: TMemoryStream;
    ndx: LongInt;
    procedure ShowMemStr;
  public
    { Public declarations }
  end;

var
  FrmMemoryStream: TFrmMemoryStream;

implementation

{$R *.dfm}

{ TFrmMemoryStream }

procedure TFrmMemoryStream.ShowMemStr;
begin
  Memo1.Lines.LoadFromStream(MemStr);
end;

procedure TFrmMemoryStream.FormCreate(Sender: TObject);
begin
  inherited;
  ndx := 0;
  MemStr := TMemoryStream.Create;
end;

procedure TFrmMemoryStream.FormDestroy(Sender: TObject);
begin
  MemStr.Free;
  inherited;
end;

procedure TFrmMemoryStream.Button1Click(Sender: TObject);
var
  str1: TFileStream;
begin
  OpenDialog1.Filter := 'Any File (*.*)|*.*';
  OpenDialog1.DefaultExt := '*';
  if OpenDialog1.Execute then
  begin
    str1 := TFileStream.Create(OpenDialog1.FileName, fmOpenRead);
    try
      MemStr.LoadFromStream(str1);
      ShowMemStr;
      Button2.Enabled := True;
    finally
      Str1.Free;
    end;
  end;
end;

procedure TFrmMemoryStream.Button3Click(Sender: TObject);
begin
  OpenDialog1.Filter := 'Any File (*.*)|*.*';
  OpenDialog1.DefaultExt := '*';
  if OpenDialog1.Execute then
  begin
      MemStr.LoadFromFile(OpenDialog1.FileName);
      ShowMemStr;
  end;
end;

procedure TFrmMemoryStream.Button2Click(Sender: TObject);
var
  pch: PChar;
begin
  pch := MemStr.Memory;
  while (pch <> nil) and
        (MessageBox(
            Handle,
            PChar('Character is ' + pch^ + #13#13 + '想继续看下一个吗?'),
            '提示', MB_YESNO + MB_ICONQUESTION) = IDYES) do
  begin
    Inc(pch);
  end;
end;

procedure TFrmMemoryStream.Button4Click(Sender: TObject);
var
  pch: PChar;
  tmpC: Char;
begin
  if ndx <= 0 then ndx := 1;
  pch := MemStr.Memory;
  tmpC := pch[ndx];
  pch[ndx] := #0;
  ListBox1.Items.SetText(MemStr.Memory);
  pch[ndx] := tmpC;
  if ndx < MemStr.Size then
    Inc(ndx)
  else
    Button2.Enabled := False;
end;

end.
