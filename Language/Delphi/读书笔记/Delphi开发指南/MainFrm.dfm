object FrmMain: TFrmMain
  Left = 192
  Top = 107
  Width = 696
  Height = 480
  Caption = 'FrmMain'
  Color = clBtnFace
  Font.Charset = ANSI_CHARSET
  Font.Color = clWindowText
  Font.Height = -12
  Font.Name = '宋体'
  Font.Style = []
  Menu = MainMenu1
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 12
  object MainMenu1: TMainMenu
    Left = 128
    Top = 56
    object N1: TMenuItem
      Caption = '第五章'
      object N581: TMenuItem
        Caption = '5.8 消息系统'
        OnClick = N581Click
      end
    end
    object N2: TMenuItem
      Caption = '第九章'
      object N941: TMenuItem
        Caption = '9.4 两数相加'
        OnClick = N941Click
      end
      object N94Form1: TMenuItem
        Caption = '9.4 显式模式Form'
        OnClick = N94Form1Click
      end
      object N95Form1: TMenuItem
        Caption = '9.5 显示无模式Form'
      end
    end
  end
end
