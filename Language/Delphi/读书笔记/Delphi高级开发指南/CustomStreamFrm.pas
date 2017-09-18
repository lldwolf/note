unit CustomStreamFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls;

type
  TEncodedStream = class(TFileStream)
    private
      FKey: Char;
    public
      constructor Create(const FileName: string; Mode: Word);
      function Read(var Buffer; Count: LongInt): LongInt; override;
      function Write(const Buffer; Count: LongInt): LongInt; override;
      property Key: Char read FKey write FKey default 'A';
  end;

  TFrmCustomStream = class(TFrm)
    GroupBox1: TGroupBox;
    Memo1: TMemo;
    Memo2: TMemo;
    BtnLoadPlain: TButton;
    BtnSaveEncode: TButton;
    BtnLoadEncode: TButton;
    SaveDialog1: TSaveDialog;
    OpenDialog1: TOpenDialog;
    procedure BtnSaveEncodeClick(Sender: TObject);
    procedure BtnLoadEncodeClick(Sender: TObject);
    procedure BtnLoadPlainClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmCustomStream: TFrmCustomStream;

implementation

{$R *.dfm}

{ TEncodedStream }

constructor TEncodedStream.Create(const FileName: string; Mode: Word);
begin
  inherited Create(FileName, Mode);
  FKey := 'A';
end;

function TEncodedStream.Read(var Buffer; Count: Integer): LongInt;
var
  pBuf, pEnc: PChar;
  i, CountRead, EncVal: Integer;
begin
  GetMem(pEnc, Count);
  try
    CountRead := inherited Read(pEnc^, Count);
    pBuf := PChar(@Buffer);
    for i := 0 to CountRead - 1 do
    begin
      EncVal := (Ord(pEnc[i]) - Ord(Key)) mod 256;
      pBuf[i] := Chr(EncVal);
    end;
  finally
    FreeMem(pEnc, Count);
  end;
  Result := CountRead;
end;

function TEncodedStream.Write(const Buffer; Count: Integer): LongInt;
var
  pBuf, pEnc: PChar;
  i, EncVal: Integer;
begin
  GetMem(pEnc, Count);
  try
    //将Buffer作为字符数组
    pBuf := PChar(@Buffer);
    for i := 0 to Count - 1 do
    begin
      EncVal := (Ord(pBuf[i]) + Ord(Key)) mod 256;
      pEnc[i] := Chr(EncVal);
    end;
    Result := inherited Write(pEnc^, Count);
  finally
    FreeMem(pEnc, Count);
  end;
end;

procedure TFrmCustomStream.BtnSaveEncodeClick(Sender: TObject);
var
  EncStr: TEncodedStream;
begin
  if SaveDialog1.Execute then
  begin
    EncStr := TEncodedStream.Create(SaveDialog1.FileName, fmCreate);
    try
      Memo1.Lines.SaveToStream(EncStr);
    finally
      EncStr.Free;
    end;
  end;
end;

procedure TFrmCustomStream.BtnLoadEncodeClick(Sender: TObject);
var
  EncStr: TEncodedStream;
begin
  if OpenDialog1.Execute then
  begin
    EncStr := TEncodedStream.Create(OpenDialog1.FileName, fmOpenRead);
    try
      Memo1.Lines.LoadFromStream(EncStr);
    finally
      EncStr.Free;
    end;
  end;
end;

procedure TFrmCustomStream.BtnLoadPlainClick(Sender: TObject);
begin
  if OpenDialog1.Execute then
  begin
    Memo2.Lines.LoadFromFile(OpenDialog1.FileName);
  end;
end;

end.
