object Form1: TForm1
  Left = 192
  Top = 107
  Width = 696
  Height = 480
  Caption = 'Form1'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  Menu = MainMenu1
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 13
  object MainMenu1: TMainMenu
    Left = 160
    Top = 216
    object N1ObjectPascal1: TMenuItem
      Caption = '&1. Object Pascal'#30340#31192#23494
      object N1111: TMenuItem
        Caption = '&1.1.1'#23383#31526#20018#24341#29992
        OnClick = N1111Click
      end
    end
    object N31: TMenuItem
      Caption = '&3. '#27969#19982#25345#20037#24615
      object N3211: TMenuItem
        Caption = '3.2.1 '#36816#34892#20013#30340#27969#23545#35937#19982#26041#27861
        OnClick = N3211Click
      end
      object N331: TMenuItem
        Caption = '3.3 '#20869#23384#27969
        OnClick = N331Click
      end
      object N341: TMenuItem
        Caption = '3.4 '#33258#23450#20041#27969
        OnClick = N341Click
      end
      object N35TReaderTWriter1: TMenuItem
        Caption = '3.5 TReader'#19982'TWriter'
        OnClick = N35TReaderTWriter1Click
      end
    end
    object N41: TMenuItem
      Caption = '4. '#36816#34892#26102#31867#22411#20449#24687
      object N42RTTI1: TMenuItem
        Caption = '4.2 '#24207#25968#31867#22411#30340'RTTI'
        OnClick = N42RTTI1Click
      end
      object N43RTTI1: TMenuItem
        Caption = '4.3 '#23545#35937#26041#27861#25351#38024#30340'RTTI'
        OnClick = N43RTTI1Click
      end
      object N44RTTI1: TMenuItem
        Caption = '4.4 '#31867#30340'RTTI'
        OnClick = N44RTTI1Click
      end
      object N451: TMenuItem
        Caption = '4.5 '#33719#24471#23383#31526#20018#23646#24615
        OnClick = N451Click
      end
      object N461: TMenuItem
        Caption = '4.6 '#36816#34892#26102#30340#26522#20030#31867#22411
        OnClick = N461Click
      end
      object N471: TMenuItem
        Caption = '4.7 '#35774#32622#32452#20214#26631#39064
        OnClick = N471Click
      end
    end
  end
end
