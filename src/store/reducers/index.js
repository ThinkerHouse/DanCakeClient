import { combineReducers } from 'redux';

// reducers
import authReducer from './AuthReducer';
import RolesReducer from './RolesReducer';
import UsersReducer from './UsersReducer';
import PermissionsReducer from './PermissionsReducer';
import DepartmentReducer from './DepartmentReducer';
import UnitReducer from './UnitReducer';
import WarehouseReducer from './WarehouseReducer';
import ChecklistReducer from './CheckListReducer';
import MaterialTypeReducer from './MaterialTypesReducer';
import MaterialReducer from './MaterialReducer';
import ProductionPlantReducer from './ProductionPlantReducer';
import PurchaseOrderReducer from './PurchaseOrderReducer';
import ProductionReducer from './ProductionReducer';
import ProductsReducer from './ProductsReducer';
import RecipeReducer from './RecipeReducer';
import RequisitionReducer from './RequisitionReducer';
import ReceiveOrderReducer from './ReceiveOrderReducer';


// Combine reducers
const rootReducer = combineReducers({
	auth: authReducer,
	roles: RolesReducer,
	users: UsersReducer,
	permissions: PermissionsReducer,
	departments: DepartmentReducer,
	units: UnitReducer,
	warehouses: WarehouseReducer,
	checklists: ChecklistReducer,
	materialType: MaterialTypeReducer,
	materials: MaterialReducer,
	productionPlant: ProductionPlantReducer,
	purchaseOrders: PurchaseOrderReducer,
	production: ProductionReducer,
	products: ProductsReducer,
	recipe: RecipeReducer,
	requisition: RequisitionReducer,
	receiveOrders: ReceiveOrderReducer
});

export default rootReducer;
