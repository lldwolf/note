unit OrdTypeFrm;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ModuleFrm, StdCtrls, TypInfo;

type
  TFrmOrdType = class(TFrm)
    ListBox1: TListBox;
    ListBox2: TListBox;
    procedure FormCreate(Sender: TObject);
    procedure ListBox1Click(Sender: TObject);
  private
    procedure AddType(pti: PTypeInfo);
    procedure ListEnum(pti: PTypeInfo; sList: TStrings);
    procedure ShowOrdinal(pti: PTypeInfo; sList: TStrings);
    procedure AddToList(const s: string);
  public
    { Public declarations }
  end;

var
  FrmOrdType: TFrmOrdType;

implementation

{$R *.dfm}

{ TFrmOrdType }

procedure TFrmOrdType.AddToList(const s: string);
begin
  ListBox2.Items.Add(s);
end;

procedure TFrmOrdType.AddType(pti: PTypeInfo);
begin
  ListBox1.Items.AddObject(pti^.Name, TObject(pti));
end;

procedure TFrmOrdType.FormCreate(Sender: TObject);
begin
  AddType(TypeInfo(Boolean));
  AddType(TypeInfo(Byte));
  AddType(TypeInfo(Cardinal));
  AddType(TypeInfo(Char));
  AddType(TypeInfo(Integer));
  AddType(TypeInfo(LongInt));
  AddType(TypeInfo(TCursor));
  AddType(TypeInfo(TColor));
end;

procedure TFrmOrdType.ListBox1Click(Sender: TObject);
var
  pti: PTypeInfo;
begin
  pti := PTypeInfo(ListBox1.Items.Objects[ListBox1.ItemIndex]);
  ListBox2.Items.Clear;
  ShowOrdinal(pti, ListBox2.Items);

  //special case: TColor
  if ListBox1.Items[ListBox1.ItemIndex] = 'TColor' then
  begin
    ListBox2.Items.Add('');
    ListBox2.Items.Add('Values...');
    GetColorValues(AddToList);
  end;

  //special case: TCursor
  if ListBox1.Items[ListBox1.ItemIndex] = 'TCursor' then
  begin
    ListBox2.Items.Add('');
    ListBox2.Items.Add('Values...');
    GetCursorValues(AddToList);
  end;
end;

procedure TFrmOrdType.ListEnum(pti: PTypeInfo; sList: TStrings);
var
  i: Integer;
begin
  with GetTypeData(pti)^ do
    for i := MinValue to MaxValue do
      sList.Add('   ' + IntToStr(i) + '.  ' + GetEnumName(pti, i));
end;

procedure TFrmOrdType.ShowOrdinal(pti: PTypeInfo; sList: TStrings);
var
  ptd: PTypeData;
begin
  if not (pti^.Kind in [tkInteger, tkChar, tkEnumeration, tkSet, tkWChar]) then
    raise Exception.Create('�Ƿ����ͣ�');

  ptd := GetTypeData(pti);
  sList.Add('Type Name:' + pti^.Name);

  //access the TTypeInfo structure
  sList.Add('Type Kind:' + GetEnumName(TypeInfo(TTypeKind), Integer(pti^.Kind)));

  //access the TTypeData structure
  sList.Add('Implement:' + GetEnumName(TypeInfo(TOrdType), Integer(ptd^.OrdType)));

  //a set has no min and max
  if pti^.Kind <> tkSet then
  begin
    sList.Add('Min Value:' + IntToStr(ptd.MinValue));
    sList.Add('Max Value:' + IntToStr(ptd.MaxValue));
  end;

  //add the enumeration base type
  //and the list of the values
  if pti^.Kind = tkEnumeration then
  begin
    sList.Add('Base Type:' + (ptd^.BaseType)^.Name);
    sList.Add('');
    sList.Add('Values...');
    ListEnum(pti, sList);
  end;

  //Show RTTI info about set base type
  if pti^.Kind = tkSet then
  begin
    sList.Add('');
    sList.Add('Set base type information...');
    ShowOrdinal(ptd.CompType^, sList);
  end;
end;

end.
