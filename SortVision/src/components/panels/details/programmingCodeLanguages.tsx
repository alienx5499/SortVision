import type { IconType } from 'react-icons';
import { Code } from 'lucide-react';
import { SiPython } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiCplusplus } from 'react-icons/si';
import { SiC } from 'react-icons/si';
import { SiPhp } from 'react-icons/si';
import { SiGo } from 'react-icons/si';
import { SiSwift } from 'react-icons/si';
import { SiKotlin } from 'react-icons/si';
import { SiRust } from 'react-icons/si';
import { SiRuby } from 'react-icons/si';
import { SiScala } from 'react-icons/si';
import { SiDart } from 'react-icons/si';
import { SiR } from 'react-icons/si';
import { SiLua } from 'react-icons/si';
import { SiHaskell } from 'react-icons/si';
import { SiJulia } from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { DiDotnet } from 'react-icons/di';

export type ProgrammingCodeLanguageOption = {
  id: string;
  name: string;
  icon: IconType | typeof Code;
  iconColor: string;
};

export const PROGRAMMING_CODE_LANGUAGE_OPTIONS: ProgrammingCodeLanguageOption[] =
  [
    {
      id: 'pseudocode',
      name: 'Pseudocode',
      icon: Code,
      iconColor: 'text-emerald-400',
    },
    { id: 'c', name: 'C', icon: SiC, iconColor: 'text-[#a8b9cc]' },
    {
      id: 'cpp',
      name: 'C++',
      icon: SiCplusplus,
      iconColor: 'text-[#00599c]',
    },
    {
      id: 'csharp',
      name: 'C#',
      icon: DiDotnet,
      iconColor: 'text-[#239120]',
    },
    {
      id: 'dart',
      name: 'Dart',
      icon: SiDart,
      iconColor: 'text-[#0175c2]',
    },
    {
      id: 'golang',
      name: 'Go',
      icon: SiGo,
      iconColor: 'text-[#00add8]',
    },
    {
      id: 'haskell',
      name: 'Haskell',
      icon: SiHaskell,
      iconColor: 'text-[#5e5086]',
    },
    {
      id: 'java',
      name: 'Java',
      icon: DiJava,
      iconColor: 'text-[#ed8b00]',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: SiJavascript,
      iconColor: 'text-[#f7df1e]',
    },
    {
      id: 'julia',
      name: 'Julia',
      icon: SiJulia,
      iconColor: 'text-[#9558b2]',
    },
    {
      id: 'kotlin',
      name: 'Kotlin',
      icon: SiKotlin,
      iconColor: 'text-[#7f52ff]',
    },
    {
      id: 'lua',
      name: 'Lua',
      icon: SiLua,
      iconColor: 'text-[#2c2d72]',
    },
    {
      id: 'php',
      name: 'PHP',
      icon: SiPhp,
      iconColor: 'text-[#777bb4]',
    },
    {
      id: 'python',
      name: 'Python',
      icon: SiPython,
      iconColor: 'text-[#3776ab]',
    },
    {
      id: 'r',
      name: 'R',
      icon: SiR,
      iconColor: 'text-[#276dc3]',
    },
    {
      id: 'ruby',
      name: 'Ruby',
      icon: SiRuby,
      iconColor: 'text-[#cc342d]',
    },
    {
      id: 'rust',
      name: 'Rust',
      icon: SiRust,
      iconColor: 'text-[#000000]',
    },
    {
      id: 'scala',
      name: 'Scala',
      icon: SiScala,
      iconColor: 'text-[#dc322f]',
    },
    {
      id: 'swift',
      name: 'Swift',
      icon: SiSwift,
      iconColor: 'text-[#fa7343]',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      icon: SiTypescript,
      iconColor: 'text-[#3178c6]',
    },
  ];
