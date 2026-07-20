export type SuiteSkill = {
  id: string;
  name: string;
  route: string | null;
  docs: string | null;
};

export const FIRST_CLASS_SKILLS: SuiteSkill[];
export const SUBSKILLS: SuiteSkill[];
export const PUBLIC_SKILLS: SuiteSkill[];
export const ROUTED_SKILLS: SuiteSkill[];
export function projectRoot(): URL;
