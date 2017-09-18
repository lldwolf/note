unit MethodPointerRTTIFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls, TypInfo;

type
  TParamData = record
    Flags: TParamFlags;
    ParamName: ShortString;
    TypeName: ShortString;
  end;
  PParamData = ^TParamData;

  TFrmMethodPointerRTTI = class(TFrm)
    ListBox1: TListBox;
    ListBox2: TListBox;
    procedure FormCreate(Sender: TObject);
    procedure ListBox1Click(Sender: TObject);
  private
    procedure AddType(pti: PTypeInfo);
    procedure ShowOrdinal(pti: PTypeInfo; sList: TStrings);
  public
    { Public declarations }
  end;

var
  FrmMethodPointerRTTI: TFrmMethodPointerRTTI;

implementation

{$R *.dfm}

{ TFrmOrdType }

procedure TFrmMethodPointerRTTI.AddType(pti: PTypeInfo);
begin
  ListBox1.Items.AddObject(pti^.Name, TObject(pti));
end;

procedure TFrmMethodPointerRTTI.FormCreate(Sender: TObject);
begin
  AddType(TypeInfo(TNotifyEvent));
  AddType(TypeInfo(TFindMethodEvent));
  AddType(TypeInfo(THelpEvent));
  AddType(TypeInfo(TSetNameEvent));
  AddType(TypeInfo(TDragOverEvent));
  AddType(TypeInfo(TMouseMoveEvent));
end;

procedure TFrmMethodPointerRTTI.ListBox1Click(Sender: TObject);
var
  pti: PTypeInfo;
begin
  pti := PTypeInfo(ListBox1.Items.Objects[ListBox1.ItemIndex]);
  ListBox2.Items.Clear;
  ShowOrdinal(pti, ListBox2.Items);
end;

procedure TFrmMethodPointerRTTI.ShowOrdinal(pti: PTypeInfo; sList: TStrings);
var
  ptd: PTypeData;
  pParam: PParamData;
  nParam: Integer;
  Line: string;
  pTypeString, pReturnString: ^ShortString;
begin
  if (pti^.Kind <> tkMethod) then
    raise Exception.Create('非法类型！');

  ptd := GetTypeData(pti);
  sList.Add('Type Name:' + pti^.Name);

  //access the TTypeInfo structure
  sList.Add('Type Kind:' + GetEnumName(TypeInfo(TTypeKind), Integer(pti^.Kind)));

  //access the TTypeData structure
  sList.Add('Implement:' + GetEnumName(TypeInfo(TOrdType), Integer(ptd^.OrdType)));
  sList.Add('Number of parameters:' + IntToStr(ptd^.ParamCount));

  //access to the ParamList
  //get the initial pointer and reset the parameters counter
  pParam := PParamData(@ptd^.ParamList);
  nParam := 1;
  while nParam <= ptd^.ParamCount do
  begin
    //read the infomation
    Line := 'Param ' + IntToStr(nParam) + ' > ';
    //add type of parameter
    if pfVar in pParam^.Flags then Line := Line + 'var ';
    if pfConst in pParam^.Flags then Line := Line + 'const ';
    if pfOut in pParam^.Flags then Line := Line + 'out ';
    //get the parameter name
    Line := Line + ': ';
    //one more type of parameter
    if pfArray in pParam^.Flags then Line := Line + ' array of ';
    //the type name string must be located...
    //moving a pointer past the params and the string (including its size byte)
    pTypeString := Pointer(Integer(pParam) + sizeof(TParamFlags) + Length(pParam^.ParamName) + 1);
    //add the type name
    Line := Line + pTypeString^;
    //finally output the string
    sList.Add(Line);
    //move the pointer to the next structure, past the two strings(including size byte)
    pParam := PParamData(Integer(pParam) + sizeof(TParamFlags)
        + Length(pParam^.ParamName) + 1 + Length(pTypeString^) + 1);
    //increase the parameters counter
    Inc(nParam);
  end;
  //show the return Type if a function
  if ptd^.MethodKind = mkFunction then
  begin
    //at the end, instead of a param data, there is the return string
    pReturnString := Pointer(pParam);
    sList.Add('Returns > ' + pReturnString^);
  end;
end;

end.
