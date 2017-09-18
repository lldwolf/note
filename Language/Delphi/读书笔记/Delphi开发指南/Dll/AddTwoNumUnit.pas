unit AddTwoNumUnit;

interface

function AddTwoNum(const Num1, Num2: Word): Word; stdcall;

implementation

function AddTwoNum(const Num1, Num2: Word): Word;
begin
  Result := 3;
end;

end.
