import { useEffect, useMemo, useState, startTransition } from 'react';
import type { Location, NavigateFunction } from 'react-router-dom';
import { stripLanguagePrefix } from '@/config/i18n';
import type { GitHubContributor } from '../githubContributor';

type UseContributorListStateArgs = {
  location: Location;
  contributors: GitHubContributor[];
  navigate: NavigateFunction;
  getLocalizedUrl: (path: string) => string;
  projectAdmins: string[];
  botUsers: string[];
};

export const useContributorListState = ({
  location,
  contributors,
  navigate,
  getLocalizedUrl,
  projectAdmins,
  botUsers,
}: UseContributorListStateArgs) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContributor, setSelectedContributor] =
    useState<GitHubContributor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const { parts: pathWithoutLanguage } = stripLanguagePrefix(pathParts);

    if (
      pathWithoutLanguage.length >= 3 &&
      pathWithoutLanguage[0] === 'contributions' &&
      pathWithoutLanguage[1] === 'overview'
    ) {
      const contributorUsername = pathWithoutLanguage[2];
      if (contributorUsername && contributors.length > 0) {
        const contributor = contributors.find(
          c => c.login === contributorUsername
        );
        if (contributor) {
          startTransition(() => {
            setSelectedContributor(contributor);
            setIsModalOpen(true);
          });
        }
      }
    }
  }, [location.pathname, contributors]);

  const filteredContributors = useMemo(() => {
    return contributors.filter(contributor => {
      const matchesSearch = contributor.login
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      switch (filter) {
        case 'admins':
          return matchesSearch && projectAdmins.includes(contributor.login);
        case 'bots':
          return matchesSearch && botUsers.includes(contributor.login);
        case 'community':
          return (
            matchesSearch &&
            !projectAdmins.includes(contributor.login) &&
            !botUsers.includes(contributor.login)
          );
        default:
          return matchesSearch;
      }
    });
  }, [contributors, searchTerm, filter, projectAdmins, botUsers]);

  const handleContributorClick = (contributor: GitHubContributor) => {
    setSelectedContributor(contributor);
    setIsModalOpen(true);
    navigate(getLocalizedUrl(`contributions/overview/${contributor.login}`), {
      replace: true,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContributor(null);
    navigate(getLocalizedUrl('contributions/overview'), { replace: true });
  };

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    selectedContributor,
    isModalOpen,
    filteredContributors,
    handleContributorClick,
    handleCloseModal,
  };
};
