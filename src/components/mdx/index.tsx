import ImageGallery from "./ImageGallery";
import { DmmCard } from "./DmmCard";
import YouTubeCard from "./YouTubeCard";
import LinkCard from "./LinkCard";
import { RakutenCard } from "./RakutenCard";
import RelatedLinks from "./RelatedLinks";
import ThreeSixtyView from "./ThreeSixtyView";
import BuildStep, { BuildStepGroup } from "./BuildStep";
import Heading2 from "./Heading2";
import Heading3 from "./Heading3";
import Table, { THead, TBody, Tr, Th, Td } from "./Table";

export const mdxComponents = {
  h2: Heading2,
  h3: Heading3,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: Tr,
  th: Th,
  td: Td,
  ImageGallery,
  DmmCard,
  YouTubeCard,
  LinkCard,
  RakutenCard,
  RelatedLinks,
  ThreeSixtyView,
  BuildStep,
  BuildStepGroup,
};

export {
  ImageGallery,
  DmmCard,
  YouTubeCard,
  LinkCard,
  RakutenCard,
  RelatedLinks,
  ThreeSixtyView,
  BuildStep,
  BuildStepGroup,
};
