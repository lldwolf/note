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
  Font.Name = '����'
  Font.Style = []
  Menu = MainMenu1
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 12
  object MainMenu1: TMainMenu
    Left = 128
    Top = 56
    object N1: TMenuItem
      Caption = '������'
      object N581: TMenuItem
        Caption = '5.8 ��Ϣϵͳ'
        OnClick = N581Click
      end
    end
    object N2: TMenuItem
      Caption = '�ھ���'
      object N941: TMenuItem
        Caption = '9.4 �������'
        OnClick = N941Click
      end
      object N94Form1: TMenuItem
        Caption = '9.4 ��ʽģʽForm'
        OnClick = N94Form1Click
      end
      object N95Form1: TMenuItem
        Caption = '9.5 ��ʾ��ģʽForm'
      end
    end
  end
end
