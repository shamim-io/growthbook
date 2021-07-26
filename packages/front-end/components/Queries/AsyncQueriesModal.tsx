import { FC } from "react";
import Modal from "../Modal";
import useApi from "../../hooks/useApi";
import { QueryInterface } from "back-end/types/query";
import LoadingOverlay from "../LoadingOverlay";
import ExpandableQuery from "./ExpandableQuery";

const AsyncQueriesModal: FC<{
  queries: string[];
  close: () => void;
}> = ({ queries, close }) => {
  const { data, error } = useApi<{ queries: QueryInterface[] }>(
    `/queries/${queries.join(",")}`
  );

  return (
    <Modal
      close={close}
      header="Queries"
      open={true}
      size="lg"
      closeCta="Close"
    >
      {!data && !error && <LoadingOverlay />}
      {error && <div className="alert alert-danger">{error.message}</div>}
      {data && data.queries.filter((q) => q === null).length > 0 && (
        <div className="alert alert-danger">
          Could not fetch information about one or more of these queries. Try
          running them again.
        </div>
      )}
      {data &&
        data.queries
          .filter((q) => q !== null)
          .map((query, i) => (
            <ExpandableQuery
              query={query}
              i={i}
              total={data.queries.length}
              key={i}
            />
          ))}
    </Modal>
  );
};

export default AsyncQueriesModal;
