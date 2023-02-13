import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Underlined = styled.span`
  color: ${({ theme }) => theme.anchor};
  text-decoration: underline;
`;

type Props = React.PropsWithChildren<{
  href: string;
}>;

export default function StyledLink({ children, href }: Props) {
  return href.includes("http") ? (
    <Underlined>
      <a href={href}>{children}</a>
    </Underlined>
  ) : (
    <Underlined>
      <Link href={href}>{children}</Link>
    </Underlined>
  );
}
