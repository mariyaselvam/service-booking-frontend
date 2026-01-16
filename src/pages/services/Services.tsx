import React, { useState, useMemo } from 'react';
import { Search, Plus, MoreHorizontal, Edit, FileText, Trash2, Clock, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type ServiceStatus = 'Active' | 'Draft' | 'Out of Stock';
type ServiceCategory = 'Home Maintenance' | 'Personal Care' | 'Cleaning';

interface Service {
  id: number;
  name: string;
  category: ServiceCategory;
  basePrice: number;
  duration: string;
  providers: number;
  status: ServiceStatus;
  thumbnail: string;
  description: string;
}

const mockServices: Service[] = [
  {
    id: 1,
    name: 'Deep House Cleaning',
    category: 'Cleaning',
    basePrice: 2499,
    duration: '3-4 hrs',
    providers: 24,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop',
    description: 'Complete deep cleaning service for entire house'
  },
  {
    id: 2,
    name: 'Sofa Sanitization',
    category: 'Cleaning',
    basePrice: 899,
    duration: '45-60 mins',
    providers: 18,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    description: 'Professional sofa deep cleaning and sanitization'
  },
  {
    id: 3,
    name: 'Kitchen Chimney Repair',
    category: 'Home Maintenance',
    basePrice: 599,
    duration: '30-45 mins',
    providers: 12,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=100&h=100&fit=crop',
    description: 'Chimney cleaning and repair service'
  },
  {
    id: 4,
    name: 'AC Service & Repair',
    category: 'Home Maintenance',
    basePrice: 449,
    duration: '60-90 mins',
    providers: 32,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=100&h=100&fit=crop',
    description: 'Complete AC servicing and repair'
  },
  {
    id: 5,
    name: 'Spa & Massage at Home',
    category: 'Personal Care',
    basePrice: 1799,
    duration: '90-120 mins',
    providers: 8,
    status: 'Draft',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop',
    description: 'Professional spa and massage services'
  },
  {
    id: 6,
    name: 'Bathroom Deep Cleaning',
    category: 'Cleaning',
    basePrice: 699,
    duration: '60-75 mins',
    providers: 21,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop',
    description: 'Intensive bathroom cleaning service'
  },
  {
    id: 7,
    name: 'Hair Styling & Makeup',
    category: 'Personal Care',
    basePrice: 2199,
    duration: '90-120 mins',
    providers: 15,
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
    description: 'Professional hair and makeup services'
  },
  {
    id: 8,
    name: 'Plumbing Repair Service',
    category: 'Home Maintenance',
    basePrice: 299,
    duration: '30-45 mins',
    providers: 28,
    status: 'Out of Stock',
    thumbnail: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=100&h=100&fit=crop',
    description: 'Emergency and routine plumbing repairs'
  }
];

const ServiceManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredServices = useMemo<Service[]>(() => {
    return mockServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const getStatusBadge = (status: ServiceStatus) => {
    const variants: Record<ServiceStatus, string> = {
      'Active': 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400',
      'Draft': 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400',
      'Out of Stock': 'bg-red-500/10 text-red-700 ring-1 ring-red-500/20 dark:bg-red-500/10 dark:text-red-400'
    };
    
    return (
      <Badge className={`${variants[status]} border-0 font-medium`}>
        {status}
      </Badge>
    );
  };

  const getCategoryBadge = (category: ServiceCategory) => {
    const colors: Record<ServiceCategory, string> = {
      'Home Maintenance': 'bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400',
      'Personal Care': 'bg-purple-500/10 text-purple-700 ring-1 ring-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400',
      'Cleaning': 'bg-cyan-500/10 text-cyan-700 ring-1 ring-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400'
    };
    
    return (
      <Badge className={`${colors[category]} border-0 font-medium text-xs`}>
        {category}
      </Badge>
    );
  };

  const handleAddService = (): void => {
    console.log('Adding new service...');
  };

  const handleEditPricing = (serviceId: number): void => {
    console.log('Edit pricing for service:', serviceId);
  };

  const handleManageRequirements = (serviceId: number): void => {
    console.log('Manage requirements for service:', serviceId);
  };

  const handleDelete = (serviceId: number): void => {
    console.log('Delete service:', serviceId);
  };

  const stats = {
    total: mockServices.length,
    active: mockServices.filter(s => s.status === 'Active').length,
    draft: mockServices.filter(s => s.status === 'Draft').length,
  };

  return (
    <div className="min-h-screen bg-background antialiased p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg ring-1 ring-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <p className="text-2xl font-bold text-foreground tabular-nums mt-1">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg ring-1 ring-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold text-emerald-600 tabular-nums mt-1">{stats.active}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg ring-1 ring-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Draft Services</p>
                <p className="text-2xl font-bold text-amber-600 tabular-nums mt-1">{stats.draft}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg ring-1 ring-border p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search services by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Home Maintenance">Home Maintenance</SelectItem>
                <SelectItem value="Personal Care">Personal Care</SelectItem>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
                      <button
            onClick={handleAddService}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Service
          </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-lg ring-1 ring-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Service Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Base Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Providers</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-border shrink-0">
                          <img 
                            src={service.thumbnail} 
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{service.name}</div>
                          <div className="mt-1">{getCategoryBadge(service.category)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-foreground tabular-nums">
                        ₹{service.basePrice.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm tabular-nums">{service.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold text-foreground tabular-nums">{service.providers}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(service.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleEditPricing(service.id)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Pricing
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleManageRequirements(service.id)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Manage Requirements
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Service
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {filteredServices.length} of {mockServices.length} services</p>
          <p className="tabular-nums">
            Average Price: ₹{Math.round(mockServices.reduce((sum, s) => sum + s.basePrice, 0) / mockServices.length).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;