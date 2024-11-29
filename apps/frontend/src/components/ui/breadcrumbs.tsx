"use client"
import React, { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

type TBreadCrumbProps = {
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
};

const DynamicBreadcrumb = ({
  separator,
  containerClasses,
  listClasses,
  activeClasses,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList className={containerClasses}>
          {pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join('/')}`;
            let itemClasses =
              paths === href ? `${listClasses} ${activeClasses}` : listClasses;
            let itemLink = capitalizeFirstLetter(link);
            return (
              <React.Fragment key={index}>
                {index === pathNames.length - 1 ? (
                  <BreadcrumbItem className={itemClasses}>
                    <BreadcrumbPage>{itemLink}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem className={itemClasses}>
                    <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {pathNames.length !== index + 1 && (
                  <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default DynamicBreadcrumb;
